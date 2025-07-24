import type { SourceWord } from "../../libs/types.ts";

export default [
  //
  // General - Main Characters
  //
  {
    en: "Aether",
    ja: "空",
    zhCN: "空",
    zhTW: "空",
    pronunciationJa: "そら",
    notes: "男性主人公名。英語版の \"Aether\" の発音は「イーサー」。俗称として MC (Main Character の略) と呼ばれることもある。",
    notesZh: "男主人公的名字。英文「Aether」为「以太」的意思。",
    notesZhTW: "男主角的名字。英文「Aether」為「以太」的意思。",
    tags: [ "character-main" ],
  },
  {
    en: "Lumine",
    ja: "蛍",
    zhCN: "荧",
    zhTW: "熒",
    pronunciationJa: "ほたる",
    notes: "女性主人公名。英語版の \"Lumine\" の発音は「ルミーン」と思われるが諸説あり。俗称として MC (Main Character の略) と呼ばれることもある。",
    notesZh: "女主人公的名字。英文「Lumine」为「发光」的意思。",
    notesZhTW: "女主角的名字。英文「Lumine」為「發光」的意思。",
    tags: [ "character-main" ],
  },
  {
    en: "Traveler",
    ja: "旅人",
    zhCN: "旅行者",
    zhTW: "旅行者",
    pronunciationJa: "たびびと",
    notes: "俗称として MC (Main Character の略) と呼ばれることもある",
    notesZh: "俗称「MC」（Main Character 的缩写）。",
    notesZhTW: "俗稱「MC」（Main Character 的縮寫）。",
    tags: [ "title", "how-to-call" ],
  },
  {
    en: "Honorary Knight",
    ja: "栄誉騎士",
    zhCN: "荣誉骑士",
    zhTW: "榮譽騎士",
    pronunciationJa: "えいよきし",
    tags: [ "mondstadt", "title", "how-to-call" ],
  },

  {
    en: "Skirk",
    ja: "スカーク",
    zhCN: "丝柯克",
    zhTW: "絲柯克",
    tags: [ "character-main" ],
    notes: "タルタリヤの師匠",
    notesZh: "达达利亚的师父。",
    notesZhTW: "達達利亞的師父。",
  },

  //
  // General - Sub-Characters
  //
  {
    en: "Paimon",
    ja: "パイモン",
    zhCN: "派蒙",
    zhTW: "派蒙",
    tags: [ "character-sub" ],
  },
  {
    en: "Flying Lavender Melon",
    ja: "空飛ぶチビ助",
    zhCN: "飞行堇瓜",
    zhTW: "飛行堇瓜",
    pronunciationJa: "そらとぶちびすけ",
    tags: [ "title" ],
    notes: "荒瀧一斗がパイモンに付けたあだ名。Lavender Melon はスミレウリのこと。直訳すると「空飛ぶスミレウリ」",
    notesZh: "荒泷一斗给派蒙起的绰号。日文「チビ助」意思是「小不点」。",
    notesZhTW: "荒瀧一斗給派蒙起的綽號。日文「チビ助」意思是「小不點」。",
  },
  {
    en: "Katheryne",
    ja: "キャサリン",
    zhCN: "凯瑟琳",
    zhTW: "凱瑟琳",
    tags: [ "character-sub" ],
  },
  {
    en: "Dandy",
    ja: "ダンディ",
    zhCN: "丹迪",
    zhTW: "丹迪",
    tags: [ "character-sub" ],
  },

  {
    en: "Sustainer of \"Heavenly Principles\"",
    ja: "「天理」の調停者",
    zhCN: "「天理」的维系者",
    zhTW: "「天理」的維繫者",
    pronunciationJa: "てんりのちょうていしゃ",
    notesEn: "Another name for \"Ruler of Space\"",
    notes: "空の執政の別の呼び方",
    notesZh: "空之执政的代称。",
    notesZhTW: "空之執政的代稱。",
    tags: [ "character-sub" ],
  },
  {
    en: "Phanes",
    ja: "パネース",  // notes: 書籍「白夜国館蔵」第2巻【パネース、或いは原初のあの方】
    zhCN: "法涅斯",
    zhTW: "法涅斯",
    tags: [ "character-sub" ],
  },
  {
    en: "The Primordial One",
    ja: "原初のあの方",  // notes: 書籍「白夜国館蔵」第2巻【パネース、或いは原初のあの方】
    zhCN: "原初的那一位",
    zhTW: "原初的那一位",
    pronunciationJa: "げんしょのあのかた",
    tags: [ "how-to-call", "character-sub" ],
    notesEn: "Another name for Phanes",
    notes: "パネースの別の呼び方",
    notesZh: "法涅斯的代称。",
    notesZhTW: "法涅斯的代稱。",
  },
  {
    en: "Ronova",
    ja: "ロノヴァ",  // notes: 魔人任務 第五章第四幕で名前が出て来る
    zhCN: "若娜瓦",
    zhTW: "若娜瓦",
    tags: [ "natlan", "character-sub" ],
    notesEn: "An envoy of Heavenly Principle who holds the title of \"Ruler of Death.\"",
    notes: "「死の執政」の肩書を持つ天理の使者",
    notesZh: "天理座下四影之一的「死之执政」。",
    notesZhTW: "天理座下四影之一的「死之執政」。",
  },
  {
    en: "Ruler of Death",
    ja: "死の執政",  // notes: 魔人任務 第五章第四幕で名前が出て来る
    zhCN: "死之执政",
    zhTW: "死之執政",
    pronunciationJa: "しのしっせい",
    tags: [ "natlan", "title" ],
    notesEn: "Ronova's title",
    notes: "ロノヴァの称号",
    notesZh: "若娜瓦的称号。",
    notesZhTW: "若娜瓦的稱號。",
  },
  {
    en: "Istaroth",
    ja: "イスタロト",  // notes: 書籍「白夜国館蔵」第2巻【暗黒の三年目】に記載
    zhCN: "伊斯塔露",
    zhTW: "伊斯塔露",
    tags: [ "mondstadt", "inazuma", "character-sub" ],
    notesEn: "An envoy of Heavenly Principle who holds the title of \"Ruler of Time.\"",
    notes: "「時間の執政」の肩書を持つ天理の使者",
    notesZh: "天理座下四影之一的「时间之执政」。",
    notesZhTW: "天理座下四影之一的「時間之執政」。",
  },
  {
    en: "Ruler of Time",
    ja: "時間の執政",  // notes: 書籍「白夜国館蔵」第2巻【暗黒の三年目】に記載
    zhCN: "时间之执政",
    zhTW: "時間之執政",
    pronunciationJa: "ときのしっせい",
    tags: [ "mondstadt", "inazuma", "title" ],
    notesEn: "Istaroth's title",
    notes: "イスタロトの称号",
    notesZh: "伊斯塔露的称号。",
    notesZhTW: "伊斯塔露的稱號。",
  },
  {
    en: "Naberius",
    ja: "ナベリウス",  // Mentioned in an archon quest "Paralogism"
    zhCN: "纳贝里士",
    zhTW: "納貝里士",
    tags: [ "mondstadt", "khaenriah", "character-sub" ],
    notesEn: "An envoy of Heavenly Principle who holds the title of \"Ruler of Life.\"",
    notes: "「生の執政」の肩書を持つ天理の使者",
    notesZh: "天理座下四影之一的「生之执政」。",
    notesZhTW: "天理座下四影之一的「生之執政」。",
  },
  {
    en: "Ruler of Life",
    ja: "生の執政",  // Mentioned in an archon quest "Paralogism"
    zhCN: "生之执政",
    zhTW: "生之執政",
    pronunciationJa: "せいのしっせい",
    tags: [ "mondstadt", "khaenriah", "title" ],
    notesEn: "Naberius' title",
    notes: "ナベリウスの称号",
    notesZh: "纳贝里士的称号。",
    notesZhTW: "納貝里士的稱號。",
  },
  {
    en: "Asmoday", // TODO: maybe "Sustainer of Space"?
    ja: "アスモダイ",
    zhCN: "阿斯莫代",
    zhTW: "阿斯莫代",
    tags: [ "character-sub" ],
  },
  {
    en: "Ruler of Space", // TODO: maybe "Asmoday"?
    ja: "空の執政",
    zhCN: "空之执政",
    zhTW: "空之執政",
    pronunciationJa: "くうのしっせい",
    tags: [ "mondstadt", "title" ],
  },
  {
    en: "The Trinity of Moon Goddesses",
    ja: "月の三女神",
    zhCN: "三月女神",
    zhTW: "三月女神",
    pronunciationJa: "つきのさんめがみ",
    tags: [ "how-to-call", "title" ],
  },
] as const satisfies SourceWord[];
