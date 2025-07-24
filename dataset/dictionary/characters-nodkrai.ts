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
    tags: [ "nodkrai", "character-main" ],    // TODO: Maybe a playable character from Nod-Krai, but not confirmed yet.
  },
  {
    en: "Durin",
    ja: "ドゥリン",
    zhCN: "杜林",
    zhTW: "杜林",
    tags: [ "mondstadt", "dragonspine", "character-sub" ],
  },
  {
    en: "Mini Durin",
    ja: "ちびドゥリン",
    zhCN: "小杜林",
    zhTW: "小杜林",
    tags: [ "event", "sumeru", "character-sub" ],
    notes: "v4.8 期間限定イベント「陽夏！悪龍？童話の王国！」に登場するキャラクター。レインドットが創造したドゥリンとは別個体",
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
] as const satisfies SourceWord[];
