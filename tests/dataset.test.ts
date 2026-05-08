import { DateTime } from "luxon";
import { expect, test } from "vitest";
import { z } from "zod";

import tags from "../dist/tags.json" with { type: "json" };
import words from "../dist/words.json" with { type: "json" };

const pinyinSchema = z.object({
  char: z.string().length(1),
  pron: z.string().regex(/^[a-züāēīōūǖáéíóúǘǎěǐǒǔǚàèìòùǜ]*$/),
});

const zhuyinSchema = z.object({
  char: z.string().length(1),
  pron: z.string(),
});

const variantSchema = z.object({
  en: z.string().optional(),
  ja: z.string().optional(),
  zhCN: z.string().optional(),
  zhTW: z.string().optional(),
}).strict();

const exampleSchema = z.object({
  en: z.string(),
  ja: z.string(),
  zhCN: z.string().optional(),
  zhTW: z.string().optional(),
  ref: z.string().optional(),
  refURL: z.url().optional(),
}).strict();

const wordsSchema = z.array(
  z.strictObject({
    id: z.string().regex(/^[a-z0-9-]+$/),
    en: z.string().trim(),
    ja: z.string().trim().optional(),
    zhCN: z.string().trim().optional(),
    zhTW: z.string().trim().optional(),
    pronunciationJa: z.string().regex(/^[ぁ-んァ-ヴー、・…〇!?:&〜/ ]+$/).optional().nullable(),
    pinyins: z.array(pinyinSchema).optional(),
    zhuyins: z.array(zhuyinSchema).optional(),
    notes: z.string().trim().optional(),
    notesEn: z.string().trim().optional(),
    notesZh: z.string().trim().optional(),
    notesZhTW: z.string().trim().optional(),
    tags: z.array(z.enum(Object.keys(tags))).optional(),
    variants: variantSchema.optional(),
    examples: z.array(exampleSchema).optional(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }).refine(
    (word) => word.ja || word.zhCN || word.zhTW,
    "Word must include at least one of: ja, zhCN, or zhTW"
  )
).superRefine((words, ctx) =>
  words.forEach((wordA, i) => {
    const hasDuplicateId = words.findIndex((wordB) => wordA.id === wordB.id) !== i;

    if (hasDuplicateId) {
      ctx.addIssue({
        code: "custom",
        message: `Duplicate word ID: ${ wordA.id }`,
        input: wordA,
      });
    }
  })
);

test("words schema validation and duplicates", async () => wordsSchema.parse(words));

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
      "zh-TW": "綠",
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
    /*
    {
      ja: "誇",
      "zh-CN": "夸",
      "zh-TW": "誇",  // Note: "馬夸胡伊特爾" is the official translation in the game v5.8. Isn't it normal to use "誇"?
    },
    */
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
      ja: "語",
      "zh-CN": "语",
      "zh-TW": "語",
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
    {
      ja: "達",
      "zh-CN": "达",
      "zh-TW": "達",
    },
    {
      ja: "亜",
      "zh-CN": "亚",
      "zh-TW": "亞",
    },
    {
      ja: "紀",
      "zh-CN": "纪",
      "zh-TW": "紀",
    },
    {
      ja: "為",
      "zh-CN": "为",
      "zh-TW": "為",
    },
    {
      ja: "動",
      "zh-CN": "动",
      "zh-TW": "動",
    },
    {
      ja: "優",
      "zh-CN": "优",
      "zh-TW": "優",
    },
    {
      ja: "門",
      "zh-CN": "门",
      "zh-TW": "門",
    },
    {
      ja: "間",
      "zh-CN": "间",
      "zh-TW": "間",
    },
    {
      ja: "厳",
      "zh-CN": "严",
      "zh-TW": "嚴",
    },
    {
      ja: "飛",
      "zh-CN": "飞",
      "zh-TW": "飛",
    },
    {
      ja: "蘭",
      "zh-CN": "兰",
      "zh-TW": "蘭",
    },
    {
      ja: "馬",
      "zh-CN": "马",
      "zh-TW": "馬",
    },
    /*
    {
      ja: "険",
      "zh-CN": "险",
      "zh-TW": "險",
    },
    */
    {
      ja: "与",
      "zh-CN": "与",
      "zh-TW": "與",
    },
    {
      ja: "堅",
      "zh-CN": "坚",
      "zh-TW": "堅",
    },
    {
      ja: "双", // Note: 日本語でも「雙」を使うことはある。【例】雙津峡温泉
      "zh-CN": "双",
      "zh-TW": "雙",
    },
    {
      ja: "園",
      "zh-CN": "园",
      "zh-TW": "園",
    },
    {
      ja: "猫",
      "zh-CN": "猫",
      "zh-TW": "貓",
    },
    {
      ja: "麗",
      "zh-CN": "丽",
      "zh-TW": "麗",
    },
    {
      ja: "蘇",
      "zh-CN": "苏",
      "zh-TW": "蘇",
    },
    {
      ja: "内",
      "zh-CN": "内",
      "zh-TW": "內",
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

      expect(word.ja).not.toContain(
        nonJapaneseChars.find(char => word.ja.includes(char))
      );
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

      expect(word.zhCN).not.toContain(
        nonSimplifiedChineseChars.find(char => word.zhCN.includes(char))
      );
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

      expect(word.zhTW).not.toContain(
        nonTraditionalChineseChars.find(char => word.zhTW.includes(char))
      );
    }
  }
});

test("if words are reverse-sorted by `updatedAt`", () => {
  const validationResults = words.map((word, index) => ({
    index,
    result: wordsSchema.safeParse(word),
  }));

  const failedValidations = validationResults.filter(v => !v.result.success);
  if (failedValidations.length > 0) {
    throw new Error(`Validation failed for words at indices: ${failedValidations.map(v => v.index).join(", ")}`);
  }

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
    const result = wordsSchema.safeParse(word);
    if (!result.success) {
      throw new Error(`Invalid word: ${result.error.message}`);
    }

    for (const { char } of (result.data.pinyins ?? [])) {
      if (!result.data.zhCN) continue;
      expect(
        result.data.zhCN.includes(char),
       `Cannot add pinyin to ${result.data.zhCN} because it does not include "${char}"`).toBe(true);
    }
  }
});
