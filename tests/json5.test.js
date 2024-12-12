import { ok } from "node:assert";
import { DateTime } from "luxon";
import { expect, test } from "vitest";

import tags from "../dataset/tags.json";
import words from "../dist/words.json";

const japaneseChars = [
  "・", // "·"
  "鳥", // "鸟"
  "竜", // "龙"
  "災", // "灾"
  "戦", // "战"
  "猟", // "猎"
  "風", // "风"
  "楓", // "枫"
  "隊", // "队"
  "長", // "长"
  "錬", // "炼"
  "閉", // "闭"
  "終", // "终"
  "絶", // "绝"
  "紛", // "纷"
  "納", // "纳"
  "緑", // "绿"
  "約", // "约"
  "綺", // "绮"
  "鋸", // "锯"
  "鳴", // "鸣"
  "黒", // "黑"
  "競", // "竞"
  "場", // "场"
  "尋", // "寻"
  "茲", // "兹"
  "駄", // "驮"
  "獣", // "兽"
  "霊", // "灵"
  "聖", // "圣"
  "別", // "别"
  "庫", // "库"
  "誇", // "夸"
];

function isURL(urlStr) {
  try {
    new URL(urlStr);
    return true;
  } catch (err) {
    if (err.name === "TypeError") { // invalid URL
      return false;
    } else {
      throw err;
    }
  }
}

test("words[].id only includes alphanumerics & hypnens", async () => {
  for (const word of words) {
    expect(word.id).toMatch(/^[a-z0-9-]+$/);
  }
});

test("if dictionary JSON5s has no duplicate words", async () => {
  for (const { id, en, ja, zhCN } of words) {
    ok(words.filter(word => word.en === en).length === 1, `Duplicate English: ${en}`);
    if (ja) {
      ok(
        words.filter(word => word.ja === ja).length === 0 ||
        words.filter(word => word.ja === ja).length === 1,
        `Duplicate Japanese: ${ja}`
      );
    }
    if (zhCN) {
      ok(
        words.filter(word => word.zhCN === zhCN).length === 0 ||
        words.filter(word => word.zhCN === zhCN).length === 1,
        `Duplicate Chinese: ${zhCN}`
      );
    }

    if (typeof id !== "undefined") {
      ok(words.filter(word => word.id === id).length === 1, `Duplicate ID: ${id}`);
    }
  }
});

test("if dictionary JSON does not have invalid keys", async () => { // eslint-disable-line complexity
  for (const word of words) {
    const keys = Object.keys(word);

    // Required keys
    ok(keys.includes("en"), `Following word does not include English: ${JSON.stringify(word, null, 2)}`);
    ok(keys.includes("zhCN") || keys.includes("ja"), `Following word does not include neither Japanese nor Chinese: ${JSON.stringify(word, null, 2)}`);

    // Check if invalid key exists
    for (const key of keys) {
      ok(
        key === "id" ||
        key === "en" ||
        key === "ja" ||
        key === "zhCN" ||
        key === "pronunciationJa" ||
        key === "pinyins" ||
        key === "notes" ||
        key === "notesEn" ||
        key === "notesZh" ||
        key === "tags" ||
        key === "variants" ||
        key === "examples" ||
        key === "createdAt" ||
        key === "updatedAt",
        `"${key}" is not a valid key.`
      );
    }

    if (word.pinyins) {
      for (const pinyin of word.pinyins) {
        for (const pinyinKey of Object.keys(pinyin)) {
          ok(
            pinyinKey === "char" || pinyinKey === "pron",
            `"pinyins[].${pinyinKey}" is not a valid key.`
          );
        }
      }
    }

    if (word.variants) {
      for (const variantsKey of Object.keys(word.variants)) {
        ok(
          variantsKey === "en" ||
          variantsKey === "ja" ||
          variantsKey === "zhCN" ,
          `"variants.${variantsKey}" is not a valid key.`
        );
      }
    }

    if (word.examples) {
      for (const example of word.examples) {
        for (const exampleKey of Object.keys(example)) {
          ok(
            exampleKey === "en" ||
            exampleKey === "ja" ||
            exampleKey === "zhCN" ||
            exampleKey === "ref" ||
            exampleKey === "refURL",
            `"examples[].${exampleKey}" is not a valid key.`
          );
        }
      }
    }
  }
});

test("if property values of dictionary JSON complies the format.", async () => {
  const tagIDs = Object.keys(tags);

  for (const word of words) {
    expect(typeof word.id).toBe("string");
    expect(typeof word.en).toBe("string");
    expect(word.en).equal(word.en.trim());
    if (word.ja) {
      expect(typeof word.ja).toBe("string");
      expect(word.ja).equal(word.ja.trim());
    }
    if (word.zhCN) {
      expect(typeof word.zhCN).toBe("string");
      expect(word.zhCN).equal(word.zhCN.trim());
    }

    if (typeof word.notesEn !== "undefined") {
      expect(typeof word.notesEn).toBe("string");
      expect(word.notesEn).equal(word.notesEn.trim());
    }

    if (typeof word.notes !== "undefined") {
      expect(typeof word.notes).toBe("string");
      expect(word.notes).equal(word.notes.trim());
    }

    if (typeof word.notesZh !== "undefined") {
      expect(typeof word.notesZh).toBe("string");
      expect(word.notesZh).equal(word.notesZh.trim());
    }

    if (typeof word.pronunciationJa !== "undefined" && word.pronunciationJa !== null) {
      expect(word.pronunciationJa).toMatch(/^[ぁ-んァ-ヴー、・…〇!?:&〜/ ]+$/);
    }

    if (typeof word.tags !== "undefined" && word.tags !== null) {
      for (const tag of word.tags) {
        ok(tagIDs.includes(tag), `Invalid tag ${tag} is found in the word ${word.en} (${word.ja})`);
      }
    }

    if (word.pinyins) {
      for (const pinyin of word.pinyins) {
        expect(pinyin.char).toHaveLength(1);
        expect(pinyin.pron).toMatch(/^[a-züāēīōūǖáéíóúǘǎěǐǒǔǚàèìòùǜ]*$/);
      }
    }

    if (word.variants) {
      expect(typeof word.variants).toBe("object");

      for (const lang of [ "en", "ja", "zhCN" ]) {
        if (typeof word.variants?.[lang] !== "undefined" && word.variants?.[lang] !== null) {
          ok(Array.isArray(word.variants[lang]), `word.variants.${lang} should be array but actually ${word.variants[lang]}`);

          for (const variant of word.variants[lang]) {
            expect(typeof variant).toBe("string");
          }
        }
      }
    }

    if (typeof word.examples !== "undefined" && word.examples !== null) {
      for (const example of word.examples) {
        expect(typeof example.en).toBe("string");
        expect(typeof example.ja).toBe("string");
        if (example.zhCN) {
          expect(typeof example.zhCN).toBe("string");
        }

        if (typeof example.ref !== "undefined") {
          expect(typeof example.ref).toBe("string");
        }

        if (typeof example.refURL !== "undefined") {
          ok(isURL(example.refURL), `Invalid refURL of ${word.en}: ${example.refURL}`);
        }
      }
    }

    // Check simplified Chinese characters
    if (!word.zhCN) {
      return;
    }

    expect(word.zhCN).not.toMatch(/[ぁ-んァ-ヴー]/);

    for (const jaChar of japaneseChars) {
      expect(word.zhCN).not.toContain(jaChar);
    }
  }
});

test("if words are reverse-sorted by `updatedAt`", () => {
  words.reduce((wordA, wordB) => {
    expect(
      DateTime.fromISO(wordA.updatedAt) >= DateTime.fromISO(wordB.updatedAt),
      `wordA: ${ JSON.stringify(wordA, null, 2) }` + "\n" + `wordB: ${ JSON.stringify(wordB, null, 2) }`
    ).toBe(true);

    return wordB;
  });
});

test("if the characters specified in `pinyins.char` exists in `zhCN`", async () => {
  for (const word of words) {
    for (const { char } of (word.pinyins ?? [])) {
      expect(word.zhCN.includes(char), `Cannot add pinyin to ${word.zhCN} because it does not include "${char}"`).toBe(true);
    }
  }
});
