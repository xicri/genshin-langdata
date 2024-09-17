import { mkdir, open, rm, writeFile } from "node:fs/promises";
import iconv from "iconv-lite";
import { klona } from "klona/json";
import { isEqual } from "lodash-es";
import { DateTime } from "luxon";
import { marked } from "marked";
import fetch from "node-fetch";
import { resolve } from "node:path";
import pinyinTone from "pinyin-tone";

import { jsonTo, loadJSONs } from "./utils.js";

async function writeFileSJIS(file, data) {
  await rm(file, { force: true });

  const buffer = iconv.encode(data, "Shift_JIS");
  const fd = await open(file, "w");
  await fd.write(buffer, 0, buffer.length);
  await fd.close();
}

export class Dictionary {
  #words = [];
  #dummyWordsProd;
  #loaded = false;

  async load() {
    this.#words = await loadJSONs(resolve(import.meta.dirname, "../dataset/dictionary"), { json5: true });
    this.#addIDs();
    this.#compileMarkdown();
    this.#convertPinyinToneLetters();
    await this.#addTimestamps();
    this.#reverseSortByUpdatedOn();

    this.#loaded = true;
  }

  /**
   * Load words based on dummy words for testing
   * @param {object} options - Options
   * @param {Array} options.wordsLocal - Dummy for dataset/dictionary/*.json5
   * @param {Array} options.wordsProd - Dummy for https://dataset.genshin-dictionary.com/words.json
   * @returns {Promise<void>} - Promise object
   */
  async loadWithDummies({ wordsLocal, wordsProd }) {
    this.#words = wordsLocal;
    this.#dummyWordsProd = wordsProd;

    this.#addIDs();
    await this.#addTimestamps();
    this.#reverseSortByUpdatedOn();
    this.#compileMarkdown();
    this.#convertPinyinToneLetters();

    this.#loaded = true;
  }

  async buildJSON(distDir) {
    if (!this.#loaded) {
      throw new Error("Dictionary is not loaded yet. Run dictionary.load() first.");
    }

    const csv = this.#toCSV();

    await mkdir(distDir, { recursive: true });

    await Promise.all([
      writeFile(resolve(distDir, "words.json"), JSON.stringify(this.#words, null, 2)),
      writeFile(resolve(distDir, "words.csv"), csv),
      writeFileSJIS(resolve(distDir, "words-sjis.csv"), csv),
    ]);
  }

  #addIDs() {
    this.#words = this.#words.map(word => {
      if (!word.id) {
        word.id = word.en
          .toLowerCase()
          .replace(/\/.*/, "") // e.g. "anemogranum / anemograna" -> "anemogranum " (to avoid creating directory - dist/anemogranum-/anemograna/index.html)
          .replace(/['"!?(),○―]/g, "")
          .replaceAll("ä", "a") // e.g. diona kätzlein -> diona katzlein
          .replace(/é/g, "e") // e.g. mini seelie: rosé -> mini seelie: rose
          // e.g. the great mountain survey ⅱ -> the great mountain survey 2
          .replace(/[ⅰ-ⅻ]/g, match => String.fromCharCode(match.charCodeAt() - 8511))
          .replace(/\./g, " ") // e.g. "mt. hulao" -> "mt  hulao"
          .replace(/&/g, " and ") // e.g. "crab ham & veggie bake" -> "crab ham  and  veggie bake"
          .replace(/:/g, " ") // e.g. "battlefront: misty dungeon" -> "battlefront  misty dungeon"
          .trim()
          .replace(/ +/g, "-")
          .replace(/-+/g, "-"); // remove consecutive hyphens e.g. "mt--hulao" -> ""mt-hulao"")
      }

      return word;
    });
  }

  async #addTimestamps() {
    try {
      const res = await fetch("https://dataset.genshin-dictionary.com/words.json");

      if (res.status < 400 || this.#dummyWordsProd) {
        const wordsProd = this.#dummyWordsProd ?? await res.json();

        this.#words = this.#words.map(wordLocal => {
          const wordProd = wordsProd.find(wordProd => wordLocal.id === wordProd.id);

          if (wordProd) {
            // ▼▼ Migration ▼▼
            if (!wordProd.createdAt && wordProd.updatedAt) {
              wordProd.createdAt = wordProd.updatedAt;
            }
            // ▲▲ Migration ▲▲

            if (wordProd.updatedAt) {
              const _wordLocal = klona(wordLocal);
              const _wordProd = klona(wordProd);
              delete _wordLocal.id;
              delete _wordProd.id;
              delete _wordProd.createdAt;
              delete _wordProd.updatedAt;

              if (isEqual(_wordLocal, _wordProd)) {
                wordLocal.updatedAt = wordProd.updatedAt;
              } else {
                wordLocal.updatedAt = DateTime.now().toISODate();
                console.info(`[UPDATED] ${wordLocal.ja} (${wordLocal.en})`);
              }

              if (wordProd.createdAt) {
                wordLocal.createdAt = wordProd.createdAt;
              } else {
                // word exists but createdAt is not saved yet
                wordLocal.createdAt = "1970-01-01";
                console.info(`[RESET] ${wordLocal.ja} (${wordLocal.en})`);
              }
            } else {
              if (wordProd.createdAt) {
                wordLocal.updatedAt = wordProd.createdAt;
              } else {
                wordLocal.createdAt = DateTime.now().toISODate();
                wordLocal.updatedAt = wordLocal.createdAt;
                console.info(`[NEW] ${wordLocal.ja} (${wordLocal.en})`);
              }
            }
          } else {
            wordLocal.createdAt = DateTime.now().toISODate();
            wordLocal.updatedAt = wordLocal.createdAt;
            console.info(`[NEW] ${wordLocal.ja} (${wordLocal.en})`);
          }

          return wordLocal;
        });
      } else {
        throw new Error("dataset.genshin-dictionary.com unavailable");
      }
    } catch (err) {
      if (err.name === "FetchError" || err.message === "dataset.genshin-dictionary.com unavailable") {
        console.warn("[WARNING] createdAt is reset since production API is unavailable.");

        this.#words = this.#words.map(wordLocal => {
          wordLocal.createdAt = wordLocal.updatedAt = "2022-01-01";

          return wordLocal;
        });
      } else {
        throw err;
      }
    }
  }

  #compileMarkdown() {
    marked.use({
      renderer: {
        link({ href, text }) {
          if (href.startsWith("http://") || href.startsWith("https://")) {
            return `<a href="${href}" target="_blank" rel="noopener">${text}</a>`;
          } else {
            return `<a href="${href}">${text}</a>`;
          }
        },
      },
    });

    this.#words = this.#words.map(word => {
      if (word.notes) {
        word.notes = marked.parseInline(word.notes);
      }
      if (word.notesZh) {
        word.notesZh = marked.parseInline(word.notesZh);
      }

      return word;
    });
  }

  #reverseSortByUpdatedOn() {
    this.#words.sort((wordA, wordB) => {
      const updatedOnA = DateTime.fromISO(wordA.updatedAt);
      const updatedOnB = DateTime.fromISO(wordB.updatedAt);

      if (updatedOnA < updatedOnB) {
        return 1; // wordB is newer than wordA
      } else if (updatedOnA === updatedOnB) {
        return 0; // Keep the order as is
      } else if (updatedOnB < updatedOnA) {
        return -1; // wordA is newer than wordB
      }
    });
  }

  #convertPinyinToneLetters() {
    this.#words = this.#words.map(word => {
      if (word.pinyins) {
        word.pinyins = word.pinyins.map(pinyin => {
          pinyin.pron = pinyinTone(pinyin.pron);

          return pinyin;
        });
      }

      return word;
    });
  }

  #toCSV() {
    const json = this.#words.map(word => {
      const flattened = {
        ID: word.id,
        英語: word.en,
        日本語: word.ja,
        日本語読み: word.pronunciationJa,
        備考: word.notes,
        "誤記・通称等": [].concat(word.variants?.ja ?? [], word.variants?.en ?? []).join("・"),
        タグ: word.tags?.join(", "),
      };

      if (word.examples) {
        for (let i = 0; i < word.examples.length; i++) {
          flattened[`例文${i+1} 英語`] = word.examples[i].en;
          flattened[`例文${i+1} 日本語`] = word.examples[i].ja;
          flattened[`例文${i+1} 出典`] = word.examples[i].ref;
          flattened[`例文${i+1} 出典リンク`] = word.examples[i].refURL;
        }
      }

      return flattened;
    });

    return jsonTo("csv", json);
  }
}
