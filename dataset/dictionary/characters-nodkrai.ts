import type { SourceWord } from "../../libs/types.ts";

export default [
  //
  // Nod-Krai - Main Characters
  //
  {
    en: "Ineffa",
    ja: "イネファ",
    zhCN: "伊涅芙",
    zhTW: "伊涅芙",
    tags: [ "nodkrai", "character-main" ],
  },
  {
    en: "Lauma",
    ja: "ラウマ",
    zhCN: "菈乌玛",
    zhTW: "菈烏瑪",
    tags: [ "nodkrai", "character-main" ],    // TODO: Maybe a playable character from Nod-Krai, but not confirmed yet.
  },
  {
    en: "Nefer",
    ja: "ネフェル",
    zhCN: "奈芙尔",
    zhTW: "奈芙爾",
    tags: [ "nodkrai", "character-main" ],    // TODO: Maybe a playable character from Nod-Krai, but not confirmed yet.
  },
  {
    en: "Flins",
    ja: "フリンズ",
    zhCN: "菲林斯",
    zhTW: "菲林斯",
    tags: [ "nodkrai", "character-main" ],    // TODO: Maybe a playable character from Nod-Krai, but not confirmed yet.
  },
  {
    en: "Kyryll Chudomirovich Flins",
    ja: "キリル・チュードミロヴィッチ・フリンズ",
    zhCN: "克里洛·楚德米洛维奇·菲林斯",
    zhTW: "克里洛·楚德米洛維奇·菲林斯",
    notesEn: "Full name of Flins",
    notes: "フリンズのフルネーム",
    tags: [ "nodkrai", "character-main" ],    // TODO: Maybe a playable character from Nod-Krai, but not confirmed yet.
  },
  {
    en: "\"Moon Maiden\"",
    ja: "「月の少女」",
    zhCN: "「月之少女」",
    zhTW: "「月之少女」",
    pronunciationJa: "つきのしょうじょ",
    tags: [ "nodkrai", "title" ],    // TODO: Maybe a playable character from Nod-Krai, but not confirmed yet.
  },

  //
  // Nod-Krai - Sub Characters
  //
  {
    en: "Snowland Fae",
    ja: "雪国の妖精",
    zhCN: "雪国的妖精",
    zhTW: "雪國的妖精",
    notes: "期間限定Webイベント「空月の歌」の情報",
    notesZh: "限时网页活动「空月之歌」中的信息。",
    notesZhTW: "限時網頁活動「空月之歌」中的資訊。",
    pronunciationJa: "ゆきぐにのようせい",
    tags: [ "nodkrai", "character-sub" ],
  },
  {
    en: "Aino",
    ja: "アイノ",
    zhCN: "爱诺",
    zhTW: "愛諾",
    tags: [ "nodkrai", "character-sub" ],    // TODO: Maybe a NPC character from Nod-Krai, but not confirmed yet.
  },
  {
    en: "Jahoda",
    ja: "ヤフォダ",
    zhCN: "雅珂达",
    zhTW: "雅珂達",
    tags: [ "nodkrai", "character-sub" ],    // TODO: Maybe a NPC character from Nod-Krai, but not confirmed yet.
  },
  {
    en: "Adieta",
    ja: "アディエッタ",
    zhCN: "爱莱妲",
    zhTW: "愛萊妲",
    notes: "魔神任務「帰途」に登場する人物",
    notesZh: "魔神任务 空月之歌 序奏「归途」中的登场角色。",
    notesZhTW: "魔神任務 空月之歌 序奏「歸途」中的登場角色。",
    tags: [ "nodkrai", "natlan", "character-sub" ],
  },
  {
    en: "Aamu",
    ja: "アームー",
    zhCN: "艾慕",
    zhTW: "艾慕",
    notes: "魔神任務「帰途」に登場する人物",
    notesZh: "魔神任务 空月之歌 序奏「归途」中的登场角色。",
    notesZhTW: "魔神任務 空月之歌 序奏「歸途」中的登場角色。",
    tags: [ "nodkrai", "natlan", "character-sub" ],
  },
  {
    en: "Zhuoxin",
    ja: "卓新",
    zhCN: "卓新",
    zhTW: "卓新",
    pronunciationJa: "たくしん",
    notes: "魔神任務「帰途」に登場する人物",
    tags: [ "nodkrai", "natlan", "liyue", "character-sub" ],
  },
  {
    en: "Edenyo",
    ja: "エデーニョ",
    zhCN: "埃德恩",
    zhTW: "埃德恩",
    notes: "魔神任務「帰途」に登場する人物",
    tags: [ "nodkrai", "natlan", "character-sub" ],
  },
  {
    en: "Asimu",
    ja: "アシム",
    zhCN: "阿西木",
    zhTW: "阿西木",
    notes: "魔神任務「帰途」に登場する人物",
    tags: [ "nodkrai", "natlan", "character-sub" ],
  },
] as const satisfies SourceWord[];
