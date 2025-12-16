import type { SourceWord } from "../../libs/types.ts";

export default [
  //
  // Snezhnaya - Main Characters
  //
  {
    en: "Tsaritsa",
    ja: "氷の女皇",
    zhCN: "冰之女皇",
    zhTW: "冰之女皇",
    pronunciationJa: "こおりのじょこう",
    notes: "原義はロシアなどにおける女王や王妃に対する尊称。ツァーリ (Tsar) の女性形。",
    notesZh: "「Tsaritsa」为俄文中对女王或王妃的尊称，「Tsar」（沙皇）的阴性形式。",
    notesZhTW: "「Tsaritsa」為俄文中對女王或王妃的尊稱，「Tsar」（沙皇）的陰性形式。",
    tags: [ "snezhnaya", "character-sub" ],
  },
  {
    en: "Anastasya Feodorovna Snezhnaya",   // Note: Columbina Hyposelenia's official introduction
    ja: "アナスターシャ・フョードロヴナ・スネージナヤ",
    zhCN: "安娜丝塔夏·费奥多罗夫娜·雪奈茨娜娅",
    zhTW: "安娜絲塔夏·費奧多羅夫娜·雪奈茨娜婭",
    notesEn: "Presumed real name of the Tsaritsa, though not officially confirmed.",
    notes: "氷の女皇の本名だと思われるが、公式発表はされていない。",
    tags: [ "snezhnaya", "character-sub" ],
  },
  {
    en: "Cryo Archon",
    ja: "氷神",
    zhCN: "冰神",
    zhTW: "冰神",
    tags: [ "snezhnaya", "title" ],
    pronunciationJa: "ひょうじん",
    variants: {
      en: [ "Cryo God", "God of Cryo" ],
    },
  },

  //
  // Snezhnaya - Sub Characters
  //
  {
    en: "Belyi Tsar",
    ja: "ツァーリ・ベルーイ",
    zhCN: "白沙皇",
    zhTW: "白沙皇",
    notesEn: "The first Cryo Archon.",
    notes: "初代氷神。期間限定Webイベント「空月の歌」の情報",
    notesZh: "初代冰神。限时网页活动「空月之歌」中的信息。",
    notesZhTW: "初代冰神。限時網頁活動「空月之歌」中的資訊。",
    tags: [ "snezhnaya", "character-sub" ],
  },
  {
    en: "Teucer",
    ja: "テウセル",
    zhCN: "托克",
    zhTW: "托克",
    tags: [ "snezhnaya", "liyue", "character-sub" ],
  },
] as const satisfies SourceWord[];
