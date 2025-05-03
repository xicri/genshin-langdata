import { mkdir, open, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import iconv from "iconv-lite";
import { isEqual } from "lodash-es";
import { DateTime } from "luxon";
import { marked } from "marked";
import fetch from "node-fetch";
import pinyinTone from "pinyin-tone";
import { jsonTo } from "./utils.ts";
import { words } from "../dataset/dictionary/index.ts";
import type { SetOptional } from "type-fest";
import type { Word, SourceWord } from "./types.ts";

type IntermediateWord = SetOptional<Word, "id">;
type CsvReadyObject = {
  [key: string]: string | undefined;
};

async function writeFileSJIS(file: string, data: string): Promise<void> {
  await rm(file, { force: true });

  const buffer = iconv.encode(data, "Shift_JIS");
  const fd = await open(file, "w");
  await fd.write(buffer, 0, buffer.length);
  await fd.close();
}

export class Dictionary {
  #words: IntermediateWord[] = [];
  #dummyWordsProd?: Word[];
  #loaded: boolean = false;

  async load(): Promise<void> {
    this.#words = words;
    this.#addIDs();
    this.#compileMarkdown();
    this.#convertPinyinToneLetters();
    await this.#addTimestamps();
    this.#reverseSortByUpdatedOn();

    this.#loaded = true;
  }

  /**
   * Load words based on dummy words for testing
   * @param options - Options
   * @param options.wordsLocal - Dummy for dataset/dictionary/*.json5
   * @param options.wordsProd - Dummy for https://dataset.genshin-dictionary.com/words.json
   * @returns Promise object
   */
  async loadWithDummies(
    { wordsLocal, wordsProd }: { wordsLocal: SourceWord[], wordsProd: Word[] }
  ): Promise<void> {
    this.#words = wordsLocal;
    this.#dummyWordsProd = wordsProd;

    this.#addIDs();
    await this.#addTimestamps();
    this.#reverseSortByUpdatedOn();
    this.#compileMarkdown();
    this.#convertPinyinToneLetters();

    this.#loaded = true;
  }

  async buildJSON(distDir: string): Promise<void> {
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

  #addIDs(): void {
    this.#words = this.#words.map(word => {
      if (!word.id) {
        word.id = word.en
          .toLowerCase()
          .replace(/\/.*/, "") // e.g. "anemogranum / anemograna" -> "anemogranum " (to avoid creating directory - dist/anemogranum-/anemograna/index.html)
          .replace(/['"!?(),○―]/g, "")
          .replaceAll("ä", "a") // e.g. diona kätzlein -> diona katzlein
          .replace(/é/g, "e") // e.g. mini seelie: rosé -> mini seelie: rose
          // e.g. the great mountain survey ⅱ -> the great mountain survey 2
          .replace(/[ⅰ-ⅻ]/g, match => String.fromCharCode(match.charCodeAt(0) - 8511))
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

  async #addTimestamps(): Promise<void> {
    try {
      const res = await fetch("https://dataset.genshin-dictionary.com/words.json");

      if (res.status < 400 || this.#dummyWordsProd) {
        const wordsProd: Word[] = this.#dummyWordsProd ?? await res.json() as Word[];

        this.#words = this.#words.map(wordLocal => {
          const wordProd = wordsProd.find(wordProd => wordLocal.id === wordProd.id);

          if (wordProd) {
            // ▼▼ Migration ▼▼
            if (!wordProd.createdAt && wordProd.updatedAt) {
              wordProd.createdAt = wordProd.updatedAt;
            }
            // ▲▲ Migration ▲▲

            if (wordProd.updatedAt) {
              const { id: _, ..._wordLocal } = wordLocal;
              const { id: __, createdAt, updatedAt, ..._wordProd } = wordProd;

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
      if (
        err instanceof Error && (
          err.name === "FetchError" ||
          err.message === "dataset.genshin-dictionary.com unavailable"
        )
      ) {
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

  #compileMarkdown(): void {
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
        word.notes = marked.parseInline(word.notes, { async: false });
      }
      if (word.notesZh) {
        word.notesZh = marked.parseInline(word.notesZh, { async: false });
      }

      return word;
    });
  }

  #reverseSortByUpdatedOn(): void {
    this.#words.sort((wordA, wordB) => {
      if (!wordA.updatedAt) {
        throw new Error(`"${ wordA.en }" does not have updatedAt property`)
      }
      if (!wordB.updatedAt) {
        throw new Error(`"${ wordB.en }" does not have updatedAt property`)
      }

      const updatedOnA = DateTime.fromISO(wordA.updatedAt);
      const updatedOnB = DateTime.fromISO(wordB.updatedAt);

      if (updatedOnA < updatedOnB) {
        return 1; // wordB is newer than wordA
      } else if (updatedOnA.toMillis() === updatedOnB.toMillis()) {
        return 0; // Keep the order as is
      } else if (updatedOnB < updatedOnA) {
        return -1; // wordA is newer than wordB
      } else {
        throw new Error("Something technically wrong in Dictionary.#reverseSortByUpdatedOn()");
      }
    });
  }

  #convertPinyinToneLetters(): void {
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

  #toCSV(): string {
    const json = this.#words.map(word => {
      const flattened: CsvReadyObject = {
        ID: word.id,
        英語: word.en,
        日本語: word.ja,
        日本語読み: word.pronunciationJa,
        備考: word.notes,
        // eslint-disable-next-line quote-props -- Quotes are necessary when "・" is in the key
        "誤記・通称等": [
          ...(word.variants?.ja ?? []),
          ...(word.variants?.en ?? []),
        ].join("・"),
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
