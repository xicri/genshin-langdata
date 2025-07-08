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
