import { ok } from "node:assert";
import { DateTime } from "luxon";
import { expect, test } from "vitest";

import tags from "../dist/tags.json" with { type: "json" };
import words from "../dist/words.json" with { type: "json" };

function isURL(urlStr: string) {
  try {
    new URL(urlStr);
    return true;
  } catch (err) {
    if (err instanceof Error && err.name === "TypeError") { // invalid URL
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
  for (const { id, en, ja, zhCN, zhTW } of words) {
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
        `Duplicate Simplified Chinese: ${zhCN}`
      );
    }
    if (zhTW) {
      ok(
        words.filter(word => word.zhTW === zhTW).length === 0 ||
        words.filter(word => word.zhTW === zhTW).length === 1,
        `Duplicate Traditional Chinese: ${zhTW}`
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
    ok(keys.includes("zhCN") || keys.includes("zhTW") || keys.includes("ja"), `Following word does not include neither Japanese nor Chinese: ${JSON.stringify(word, null, 2)}`);

    // Check if invalid key exists
    for (const key of keys) {
      ok(
        key === "id" ||
        key === "en" ||
        key === "ja" ||
        key === "zhCN" ||
        key === "zhTW" ||
        key === "pronunciationJa" ||
        key === "pinyins" ||
        key === "zhuyins" ||
        key === "notes" ||
        key === "notesEn" ||
        key === "notesZh" ||
        key === "notesZhTW" ||
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

    if (word.zhuyins) {
      for (const zhuyin of word.zhuyins) {
        for (const zhuyinKey of Object.keys(zhuyin)) {
          ok(
            zhuyinKey === "char" || zhuyinKey === "pron",
            `"zhuyins[].${zhuyinKey}" is not a valid key.`
          );
        }
      }
    }

    if (word.variants) {
      for (const variantsKey of Object.keys(word.variants)) {
        ok(
          variantsKey === "en" ||
          variantsKey === "ja" ||
          variantsKey === "zhCN" ||
          variantsKey === "zhTW",
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
            exampleKey === "zhTW" ||
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
    if (word.zhTW) {
      expect(typeof word.zhTW).toBe("string");
      expect(word.zhTW).equal(word.zhTW.trim());
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

    if (typeof word.notesZhTW !== "undefined") {
      expect(typeof word.notesZhTW).toBe("string");
      expect(word.notesZhTW).equal(word.notesZhTW.trim());
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

      for (const lang of [ "en", "ja", "zhCN", "zhTW" ] as const) {
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
        if ("zhCN" in example) {
          expect(typeof example.zhCN).toBe("string");
        }
        if ("zhTW" in example) {
          expect(typeof example.zhTW).toBe("string");
        }

        if ("ref" in example) {
          expect(typeof example.ref).toBe("string");
        }

        if ("refURL" in example) {
          ok(isURL(example.refURL ?? ""), `Invalid refURL of ${word.en}: ${example.refURL}`);
        }
      }
    }
  }
});

test("if the each translations do not include characters from the other languages", {
  timeout: 20000
}, async () => {
  type LangSpecificChars = {
    ja: string;
    "zh-CN": string;
    "zh-TW"?: string;
  }[];

  const langSpecificChars: LangSpecificChars = [
    {
      ja: "・",
      "zh-CN": "·",
      "zh-TW": "·",
    },
    {
      ja: "島",
      "zh-CN": "岛",
      "zh-TW": "島",
    },
    {
      ja: "鳥",
      "zh-CN": "鸟",
      "zh-TW": "鳥",
    },
    {
      ja: "鳩",
      "zh-CN": "鸠",
    },
    {
      ja: "鳴",
      "zh-CN": "鸣",
      "zh-TW": "鳴",
    },
    {
      ja: "竜",
      "zh-CN": "龙",
    },
    {
      ja: "災",
      "zh-CN": "灾",
      "zh-TW": "災",
    },
    {
      ja: "戦",
      "zh-CN": "战",
    },
    {
      ja: "猟",
      "zh-CN": "猎",
    },
    {
      ja: "風",
      "zh-CN": "风",
      "zh-TW": "風",
    },
    {
      ja: "楓",
      "zh-CN": "枫",
      "zh-TW": "楓",
    },
    {
      ja: "陣",
      "zh-CN": "阵",
      "zh-TW": "陣",
    },
    {
      ja: "隕",
      "zh-CN": "陨",
      "zh-TW": "隕",
    },
    {
      ja: "隊",
      "zh-CN": "队",
      "zh-TW": "隊",
    },
    {
      ja: "長",
      "zh-CN": "长",
      "zh-TW": "長",
    },
    {
      ja: "錬",
      "zh-CN": "炼",
    },
    {
      ja: "閉",
      "zh-CN": "闭",
      "zh-TW": "閉",
    },
    {
      ja: "終",
      "zh-CN": "终",
      "zh-TW": "終"
    },
    {
      ja: "絶",
      "zh-CN": "绝",
    },
    {
      ja: "紛",
      "zh-CN": "纷",
      "zh-TW": "紛",
    },
    {
      ja: "納",
      "zh-CN": "纳",
      "zh-TW": "納",
    },
    {
      ja: "緑",
      "zh-CN": "绿",
    },
    {
      ja: "約",
      "zh-CN": "约",
      "zh-TW": "約",
    },
    {
      ja: "綺",
      "zh-CN": "绮",
      "zh-TW": "綺",
    },
    {
      ja: "結",
      "zh-CN": "结",
      "zh-TW": "結",
    },
    {
      ja: "鋸",
      "zh-CN": "锯",
      "zh-TW": "鋸",
    },
    {
      ja: "黒",
      "zh-CN": "黑",
      "zh-TW": "黑",
    },
    {
      ja: "競",
      "zh-CN": "竞",
      "zh-TW": "競",
    },
    {
      ja: "場",
      "zh-CN": "场",
      "zh-TW": "場",
    },
    {
      ja: "尋",
      "zh-CN": "寻",
      "zh-TW": "尋",
    },
    {
      ja: "茲",
      "zh-CN": "兹",
      "zh-TW": "茲",
    },
    {
      ja: "駄",
      "zh-CN": "驮",
    },
    {
      ja: "獣",
      "zh-CN": "兽",
    },
    {
      ja: "霊",
      "zh-CN": "灵",
    },
    {
      ja: "聖",
      "zh-CN": "圣",
      "zh-TW": "聖",
    },
    {
      ja: "別",
      "zh-CN": "别",
      "zh-TW": "別",
    },
    {
      ja: "庫",
      "zh-CN": "库",
      "zh-TW": "庫",
    },
    {
      ja: "誇",
      "zh-CN": "夸",
      "zh-TW": "誇",
    },
    {
      ja: "徳",
      "zh-CN": "德",
      "zh-TW": "德",
    },
    {
      ja: "陽",
      "zh-CN": "阳",
      "zh-TW": "陽",
    },
    {
      ja: "録",
      "zh-CN": "录",
    },
    {
      ja: "鈴",
      "zh-CN": "铃",
      "zh-TW": "鈴",
    },
    {
      ja: "偵",
      "zh-CN": "侦",
      "zh-TW": "偵",
    },
    {
      ja: "夢",
      "zh-CN": "梦",
      "zh-TW": "夢",
    },
    {
      ja: "見",
      "zh-CN": "见",
      "zh-TW": "見",
    },
    {
      ja: "覘",
      "zh-CN": "觇",
      "zh-TW": "覘",
    },
    {
      ja: "滅",
      "zh-CN": "灭",
      "zh-TW": "滅",
    },
    {
      ja: "藍",
      "zh-CN": "蓝",
      "zh-TW": "藍",
    },
    {
      ja: "斎",
      "zh-CN": "斋",
    },
    {
      ja: "閣",
      "zh-CN": "阁",
      "zh-TW": "閣",
    },
    {
      ja: "魚",
      "zh-CN": "鱼",
      "zh-TW": "魚",
    },
    {
      ja: "鳳",
      "zh-CN": "凤",
    },
    {
      ja: "剤",
      "zh-CN": "剂",
    },
    {
      ja: "熱",
      "zh-CN": "热",
      "zh-TW": "熱",
    },
    {
      ja: "誠",
      "zh-CN": "诚",
      "zh-TW": "誠",
    },
    {
      ja: "話",
      "zh-CN": "话",
      "zh-TW": "話",
    },
    {
      ja: "識",
      "zh-CN": "识",
      "zh-TW": "識",
    },
    {
      ja: "議",
      "zh-CN": "议",
      "zh-TW": "議",
    },
    {
      ja: "謁",
      "zh-CN": "谒",
      "zh-TW": "謁",
    },
    {
      ja: "脈",
      "zh-CN": "脉",
      "zh-TW": "脈",
    },
    {
      ja: "単",
      "zh-CN": "单",
    },
    {
      ja: "墜",
      "zh-CN": "坠",
      "zh-TW": "墜",
    },
    {
      ja: "処",
      "zh-CN": "处",
    },
    {
      ja: "跡",
      "zh-CN": "迹",
      "zh-TW": "跡",
    },
    {
      ja: "飲",
      "zh-CN": "饮",
      "zh-TW": "飲",
    },
    {
      ja: "審",
      "zh-CN": "审",
      "zh-TW": "審",
    },
    {
      ja: "庁",
      "zh-CN": "厅",
    },
    {
      ja: "廬",
      "zh-CN": "庐",
      "zh-TW": "廬",
    },
    {
      ja: "離",
      "zh-CN": "离",
      "zh-TW": "離",
    },
    {
      ja: "験",
      "zh-CN": "验",
    },
    {
      ja: "備",
      "zh-CN": "备",
      "zh-TW": "備",
    },
    {
      ja: "僕",
      "zh-CN": "仆",
      "zh-TW": "僕",
    },
    {
      ja: "倫",
      "zh-CN": "伦",
      "zh-TW": "倫",
    },
    {
      ja: "団",
      "zh-CN": "团",
    },
    {
      ja: "響",
      "zh-CN": "响",
      "zh-TW": "響",
    },
    {
      ja: "無",
      "zh-CN": "无",
      "zh-TW": "無",
    },
    {
      ja: "執",
      "zh-CN": "执",
      "zh-TW": "執",
    },
    {
      ja: "氷",
      "zh-CN": "冰",
      "zh-TW": "冰",
    },
    {
      ja: "巻",
      "zh-CN": "卷",
      "zh-TW": "卷",
    },
    {
      ja: "貢",
      "zh-CN": "贡",
      "zh-TW": "貢",
    },
    {
      ja: "頁",
      "zh-CN": "页",
      "zh-TW": "頁",
    },
    {
      ja: "盧",
      "zh-CN": "卢",
      "zh-TW": "盧",
    },
  ];

  for (const word of words) {
    if (word.zhCN) {
      expect(word.zhCN).not.toMatch(/[ぁ-んァ-ヴー]/);
    }

    if (word.zhTW) {
      expect(word.zhTW).not.toMatch(/[ぁ-んァ-ヴー]/);
    }

    if (word.ja) {
      const nonJapaneseChars = [
        ...langSpecificChars
          .filter((char) => char["zh-CN"] !== char.ja)
          .map((char) => char["zh-CN"]),
        ...langSpecificChars
          .filter((char) => char["zh-TW"] !== char.ja)
          .map((char) => char["zh-TW"])
          .filter((charZhTw) => charZhTw !== undefined),
      ];

      expect(word.ja).not.toContain(nonJapaneseChars);
    }

    if (word.zhCN) {
      const nonSimplifiedChineseChars = [
        ...langSpecificChars
          .filter((char) => char["zh-CN"] !== char.ja)
          .map((char) => char.ja),
        ...langSpecificChars
          .filter((char) => char["zh-TW"] !== char["zh-CN"])
          .map((char) => char["zh-TW"])
          .filter((charZhTw) => charZhTw !== undefined),
      ];

      expect(word.zhCN).not.toContain(nonSimplifiedChineseChars);
    }

    if (word.zhTW) {
      const nonTraditionalChineseChars = [
        ...langSpecificChars
          .filter((char) => char["zh-TW"] && char["zh-TW"] !== char["zh-CN"])
          .map((char) => char["zh-CN"]),
        ...langSpecificChars
          .filter((char) => char["zh-TW"] !== char.ja)
          .map((char) => char.ja),
      ];

      expect(word.zhTW).not.toContain(nonTraditionalChineseChars);
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
