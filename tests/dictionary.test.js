import { readFile } from "fs/promises";
import { DateTime } from "luxon";
import { resolve } from "path";
import { fileURLToPath } from "url";
import { expect, test, beforeAll, afterAll } from "vitest";

import { Dictionary } from "../libs/dictionary.js";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

const consoleInfoOriginal = global.console.info;

beforeAll(() => {
  global.console.info = () => {};
});

afterAll(() => {
  global.console.info = consoleInfoOriginal;
});

test("addUpdateAt() adds updatedAt properly", async () => {
  const wordsLocal = [
    {
      en: "Amber",
      ja: "アンバー",
      tags: [ "mondstadt", "character-main" ],
      id: "amber",
    },
    {
      en: "Outrider",
      ja: "偵察騎士",
      pronunciationJa: "ていさつきし",
      tags: [ "mondstadt", "title" ],
      id: "outrider",
    },
    {
      en: "Baron Bunny",
      ja: "ウサギ伯爵",
      pronunciationJa: "ウサギはくしゃく",
      tags: [ "mondstadt" ],
      id: "baron-bunny",
    },
    {
      en: "Orobaxi",
      ja: "オロバシ",
      tags: [ "inazuma", "character-sub" ],
      notes: "v2.0では Orobashi と表記されていたが、v2.1で Orobaxi に変更されたようである。しかし Orobashi のまま変更されていないままの箇所が多数ある。「オロバシノミコト」はそのまま \"Orobashi no Mikoto\" (※未変更) と表記される。",
      id: "orobaxi",
    },
    {
      en: "New Word",
      ja: "新規追加された言葉",
      id: "some-new-word",
    },
  ];
  const wordsProd = [
    // No change
    {
      en: "Amber",
      ja: "アンバー",
      tags: [ "mondstadt", "character-main" ],
      id: "amber",
      createdAt: "2022-01-01",
      updatedAt: "2022-01-01",
    },
    {
      en: "Outrider",
      ja: "偵察騎士",
      pronunciationJa: "ていさつきし",
      tags: [ "mondstadt", "title" ],
      notes: "アンバーの西風騎士団における役職", // UPDATED
      id: "outrider",
      createdAt: "2022-01-01",
      updatedAt: "2022-01-01",
    },
    {
      en: "Baron Bunny",
      ja: "ウサギ伯爵",
      pronunciationJa: "ウサギはくしゃく",
      tags: [ "mondstadt" ],
      id: "baron-bunny",
      // no createdAt & updatedAt
    },
    {
      en: "Orobashi no Mikoto",
      ja: "オロバシ",
      tags: [
        "inazuma",
        "character-sub",
      ],
      notes: "v2.0では Orobashi と表記されていたが、v2.1で Orobaxi に変更されたようである。しかし Orobashi のまま変更されていないままの箇所が多数ある。「オロバシノミコト」はそのまま \"Orobashi no Mikoto\" (※未変更) と表記される。",
      id: "orobashi-no-mikoto", // ID UPDATED
      createdAt: "2022-01-01",
      updatedAt: "2022-01-01",
    },
  ];

  const distDir = resolve(__dirname, "../cache/test/dic");
  const dic = new Dictionary();
  await dic.loadWithDummies({ wordsLocal, wordsProd });
  await dic.buildJSON(distDir);

  const jsonStr = await readFile(resolve(distDir, "words.json"), { encoding: "utf-8" });
  const wordsResults = JSON.parse(jsonStr);

  const amber = wordsResults.find(word => word.en === "Amber");
  const outrider = wordsResults.find(word => word.en === "Outrider");
  const baronBunny = wordsResults.find(word => word.en === "Baron Bunny");
  const orobaxi = wordsResults.find(word => word.en === "Orobaxi");
  const newWord = wordsResults.find(word => word.en === "New Word");

  const today = DateTime.now().toISODate();

  expect(amber.createdAt).toBe("2022-01-01");
  expect(amber.updatedAt).toBe("2022-01-01");
  expect(outrider.createdAt).toBe("2022-01-01");
  expect(outrider.updatedAt).toBe(today);
  expect(baronBunny.createdAt).toBe(today);
  expect(baronBunny.updatedAt).toBe(today);
  expect(orobaxi.createdAt).toBe(today);
  expect(orobaxi.updatedAt).toBe(today);
  expect(newWord.createdAt).toBe(today);
  expect(newWord.updatedAt).toBe(today);
});

test("Pinyin's tone numbers are converted properly", async () => {
  const wordsLocal = [
    {
      en: "Amakumo Peak",
      ja: "天雲峠",
      zhCN: "天云峠",
      pronunciationJa: "あまくもとうげ",
      pinyins: [{ char: "峠", pron: "qia3" }],
      tags: [ "inazuma", "location" ],
    },
  ];
  const wordsProd = [
    {
      id: "amakumo-peak",
      en: "Amakumo Peak",
      ja: "天雲峠",
      zhCN: "天云峠",
      pronunciationJa: "あまくもとうげ",
      pinyins: [{ char: "峠", pron: "qiǎ" }],
      tags: [ "inazuma", "location" ],
      createdAt: "2022-01-01",
      updatedAt: "2023-04-19",
    },
  ];

  const distDir = resolve(__dirname, "../cache/test/dic");
  const dic = new Dictionary();
  await dic.loadWithDummies({ wordsLocal, wordsProd });
  await dic.buildJSON(distDir);

  const jsonStr = await readFile(resolve(distDir, "words.json"), { encoding: "utf-8" });
  const [ amakumoPeak ] = JSON.parse(jsonStr);

  expect(amakumoPeak.pinyins[0].pron).toBe("qiǎ");
});
