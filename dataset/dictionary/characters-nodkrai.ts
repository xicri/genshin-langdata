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
    en: "Aino",
    ja: "アイノ",
    zhCN: "爱诺",
    zhTW: "愛諾",
    tags: [ "nodkrai", "character-sub" ],
  },
  {
    en: "Lauma",
    ja: "ラウマ",
    zhCN: "菈乌玛",
    zhTW: "菈烏瑪",
    tags: [ "nodkrai", "character-main" ],    // TODO: Maybe a playable character from Nod-Krai, but not confirmed yet.
  },
  {
    en: "Jahoda",
    ja: "ヤフォダ",
    zhCN: "雅珂达",
    zhTW: "雅珂達",
    tags: [ "nodkrai", "character-sub" ], // TODO: Maybe a NPC character from Nod-Krai, but not confirmed yet.
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
    en: "Durin",
    ja: "ドゥリン",
    zhCN: "杜林",
    zhTW: "杜林",
    notes: "レインドットに創造された龍、もしくは、アルベドによっての人の姿に錬成された「ちびドゥリン」",
    tags: [ "mondstadt", "nodkrai", "dragonspine", "character-sub" ],
  },
  {
    en: "Mini Durin",
    ja: "ちびドゥリン",
    zhCN: "小杜林",
    zhTW: "小杜林",
    tags: [ "event", "sumeru", "character-sub" ],
    notes: "v4.8 期間限定マップ・シムランカで生み出された方のドゥリンで、レインドットが創造したドゥリンとは元々別個体",
  },
  {
    en: "Varka",
    ja: "ファルカ",
    zhCN: "法尔伽",
    zhTW: "法爾伽",
    tags: [ "mondstadt", "character-sub" ],
  },
  {
    en: "Grand Master",
    ja: "大団長",
    zhCN: "大团长",
    zhTW: "大團長",
    pronunciationJa: "だいだんちょう",
    tags: [ "mondstadt", "title" ],
    notes: "ファルカの西風騎士団における職名。",
    notesZh: "法尔伽在西风骑士团的职位名。",
    notesZhTW: "法爾伽在西風騎士團的職位名。",

    examples: [{
      en: "I will now be reading Grand Master Varka's letter aloud for you all.",
      ja: "ファルカ大団長からの手紙を読ませていただきます。",
      zhCN: "下面由我代为朗读法尔伽大团长的来信。",
      zhTW: "下面由我代為朗讀法爾伽大團長的來信。",
      ref: "ミカ, Ver3.1 公式 PV 「赤砂の王と三人の巡礼者」",
      refURL: "https://www.youtube.com/watch?v=owxvZ9-0JE0&t=221s",
    }],
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
