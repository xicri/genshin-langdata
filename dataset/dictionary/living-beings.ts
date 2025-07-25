import type { SourceWord } from "../../libs/types.ts";

export default [
  {
    en: "Elemental Lifeform",
    ja: "元素生命",
    zhCN: "元素生命",
    zhTW: "元素生命",
    pronunciationJa: "げんそせいめい",
    tags: [ "living-being" ],
  },
  {
    en: "Seelie",
    ja: "仙霊",
    zhCN: "仙灵",
    zhTW: "仙靈",
    pronunciationJa: "せんれい",
    tags: [ "living-being" ],
  },
  {
    en: "Seelie Court",
    ja: "仙霊の庭",
    zhCN: "仙灵之庭",
    zhTW: "仙靈之庭",
    pronunciationJa: "せんれいのにわ",
    tags: [ "object" ],
  },
  {
    en: "Warming Seelie",
    ja: "温暖仙霊",
    zhCN: "温暖仙灵",
    zhTW: "溫暖仙靈",
    pronunciationJa: "おんだんせんれい",
    tags: [ "living-being", "dragonspine" ],
  },
  {
    en: "Electro Seelie",
    ja: "雷霊",
    zhCN: "雷灵",
    zhTW: "雷靈",
    pronunciationJa: "らいれい",
    tags: [ "living-being", "inazuma" ],
  },
  {
    en: "Luminous Seelie",
    ja: "光彩仙霊",
    zhCN: "发光仙灵", // TODO Need Check
    zhTW: "發光仙靈", // TODO Need Check
    tags: [ "living-being", "liyue" ],
  },
  // TODO Need Check
  {
    en: "Crystalfly",
    ja: "晶蝶",
    zhCN: "晶蝶",
    zhTW: "晶蝶",
    pronunciationJa: "しょうちょう",
    tags: [ "living-being" ],
  },
  {
    en: "Anemo Crystalfly",
    ja: "風晶蝶",
    zhCN: "风晶蝶",
    zhTW: "風晶蝶",
    pronunciationJa: "かぜしょうちょう",
    tags: [ "living-being", "mondstadt" ],
  },
  {
    en: "Geo Crystalfly",
    ja: "岩晶蝶",
    zhCN: "岩晶蝶",
    zhTW: "巖晶蝶",
    pronunciationJa: "いわしょうちょう",
    tags: [ "living-being", "liyue" ],
  },
  {
    en: "Cryo Crystalfly",
    ja: "氷晶蝶",
    zhCN: "冰晶蝶",
    zhTW: "冰晶蝶",
    pronunciationJa: "こおりしょうちょう",
    tags: [ "living-being", "dragonspine" ],
  },
  {
    en: "Electro Crystalfly",
    ja: "雷晶蝶",
    zhCN: "雷晶蝶",
    zhTW: "雷晶蝶",
    pronunciationJa: "かみなりしょうちょう",
    tags: [ "living-being", "inazuma" ],
  },
  {
    en: "Dendro Crystalfly",
    ja: "草晶蝶",
    zhCN: "草晶蝶",
    zhTW: "草晶蝶",
    pronunciationJa: "くさしょうちょう",
    tags: [ "living-being", "sumeru" ],
  },
  {
    en: "Hydro Crystalfly",
    ja: "水晶蝶",
    zhCN: "水晶蝶",
    zhTW: "水晶蝶",
    pronunciationJa: "みずしょうちょう", // TODO Need Check
    tags: [ "living-being", "fontaine" ],
  },
  {
    en: "Forest Boar",
    ja: "イノシシ",
    zhCN: "野林猪",
    zhTW: "野林豬",
    variants: {
      zhCN: [ "野猪" ],
      zhTW: [ "野豬" ],
    },
    tags: [ "living-being" ],
  },
  {
    en: "Snowboar",
    ja: "雪のイノシシ",
    zhCN: "雪猪",
    zhTW: "雪豬",
    pronunciationJa: "ゆきのイノシシ",
    tags: [ "living-being" ],
  },
  {
    en: "Great Snowboar King",
    ja: "雪のイノシシ王",
    zhCN: "大雪猪王",
    zhTW: "大雪豬王",
    pronunciationJa: "ゆきのイノシシおう",
    tags: [ "living-being", "enemy" ],
    variants: {
      ja: [ "イノシシ王" ],
    },
  },
  {
    en: "Shroomboar",
    ja: "キノシシ",
    zhCN: "蕈猪",
    zhTW: "蕈豬",
    tags: [ "living-being", "sumeru" ],
    pinyins: [{ char: "蕈", pron: "xun4" }],
    zhuyins: [{ char: "蕈", pron: "ㄒㄩㄣˋ" }],
  },
  {
    en: "Weasel Thief",
    ja: "宝盗イタチ",
    zhCN: "盗宝鼬",
    zhTW: "盜寶鼬",
    pronunciationJa: "ほうとうイタチ",
    tags: [ "living-being" ],
  },
  {
    en: "Amateur Weasel Thief",
    ja: "宝盗イタチ・新米",
    zhCN: "新手盗宝鼬",
    zhTW: "新手盜寶鼬",
    pronunciationJa: "ほうとうイタチ・しんまい",
    tags: [ "living-being" ],
  },
  {
    en: "Hoarder Weasel Thief",
    ja: "宝盗イタチ・中堅",
    zhCN: "藏金盗宝鼬",
    zhTW: "藏金盜寶鼬",
    pronunciationJa: "ほうとうイタチ・ちゅうけん",
    tags: [ "living-being" ],
  },
  {
    en: "Golden Weasel Thief",
    ja: "宝盗イタチ・黄金",
    zhCN: "大黄金盗宝鼬",
    zhTW: "大黃金盜寶鼬",
    pronunciationJa: "ほうとうイタチ・おうごん",
    tags: [ "living-being" ],
  },
  {
    en: "Bluethunder Weasel",
    ja: "青雷イタチ",
    zhCN: "青雷鼬",
    zhTW: "青雷鼬",
    tags: [ "living-being", "liyue" ],
  },
  {
    en: "Quicksand Unagi",
    ja: "流砂ウナギ",
    zhCN: "流沙鳗鳗",
    zhTW: "流沙鰻鰻",
    tags: [ "living-being", "sumeru" ],
  },
  {
    en: "Bakunawa",
    ja: "バクナワ",
    zhCN: "巴窟纳瓦",
    zhTW: "巴窟納瓦",
    tags: [ "living-being" ],
  },

  //
  // Liyue
  //
  {
    en: "Redbill Pelican",
    ja: "赤喙ペリカン",
    zhCN: "朱喙鹈鹕",
    zhTW: "朱喙鵜鶘",
    pronunciationJa: "あかくちばしぺりかん",
    tags: [ "living-being", "liyue" ],
  },
  {
    en: "Fluff-Fleece Goat",
    ja: "フワフワヤギ",
    zhCN: "柔柔羊",
    zhTW: "柔柔羊",
    pronunciationJa: "ふわふわやぎ",
    tags: [ "living-being", "liyue" ],
  },
  {
    en: "Jadestone Turtle",
    ja: "玉璜ガメ",
    zhCN: "玉璜龟",
    zhTW: "玉璜龜",
    pronunciationJa: "ぎょくごうがめ",
    tags: [ "living-being", "liyue" ],
  },
  {
    en: "Venerable Jadestone Turtle",
    ja: "玉璜古ガメ",
    zhCN: "玉璜古龟",
    zhTW: "玉璜古龜",
    pronunciationJa: "ぎょくごうこがめ",
    tags: [ "living-being", "liyue" ],
    notes: "遺瓏埠北部の湾内に生息する巨大亀",
    notesZh: "一只生活在遗珑埠以北海湾的巨龟",
  },
  {
    en: "Velvetfall Duck",
    ja: "秋羽鴨",
    zhCN: "秋绒鸭",
    zhTW: "秋絨鴨",
    pronunciationJa: "しゅううかも", // TODO Need Check
    tags: [ "living-being", "liyue" ],
  },
  {
    en: "Jade Heartfeather Bass",
    ja: "ヒスイのハートフェザースズキ",
    zhCN: "玉玉心羽鲈",
    zhTW: "玉玉心羽鱸",
    tags: [ "living-being", "liyue", "item" ],
  },

  //
  // Liyue ― The Casm
  //
  {
    en: "Lucklight Fly",
    ja: "吉光虫",
    zhCN: "吉光虫",
    zhTW: "吉光蟲",
    tags: [ "living-being", "liyue" ],
  },
  {
    en: "Malachitin Lumibug",
    ja: "玉光虫",
    zhCN: "珉光虫",
    zhTW: "珉光蟲",
    pronunciationJa: "ぎょくこうちゅう",
    tags: [ "living-being", "liyue" ],
  },

  //
  // Inazuma
  //
  {
    en: "Bake-Danuki",
    ja: "妖狸",
    zhCN: "妖狸",
    zhTW: "妖狸",
    pronunciationJa: "ばけだぬき / ようり",
    tags: [ "living-being", "inazuma" ],
  },
  // Enkanomiya
  {
    en: "Ghostfish",
    ja: "冥魚",
    zhCN: "冥鱼",
    zhTW: "冥魚",
    pronunciationJa: "めいぎょ", // TODO Need Check
    tags: [ "living-being", "inazuma" ],
  },

  //
  // Sumeru
  //
  {
    en: "Aranara",
    ja: "アランナラ",
    zhCN: "兰那罗",
    zhTW: "蘭那羅",
    tags: [ "living-being", "sumeru" ],
  },
  {
    en: "Dusk Bird",
    ja: "瞑彩鳥",
    zhCN: "暝彩鸟",
    zhTW: "暝彩鳥",
    tags: [ "living-being", "sumeru" ],
  },
  {
    en: "Sumpter Beast",
    ja: "駄獣",
    zhCN: "驮兽",
    zhTW: "馱獸",
    pronunciationJa: "だじゅう",
    tags: [ "living-being", "enemy", "sumeru" ],
    pinyins: [{ char: "驮", pron: "tuo2" }],
    zhuyins: [{ char: "馱", pron: "ㄊㄨㄛˊ" }],
  },
  {
    en: "Shaggy Sumpter Beast",
    ja: "モジャモジャ駄獣",
    zhCN: "牦牦驮兽",
    zhTW: "犛犛馱獸",
    pronunciationJa: "モジャモジャだじゅう",
    tags: [ "living-being", "enemy", "sumeru" ],
    pinyins: [{ char: "牦", pron: "mao2" }, { char: "驮", pron: "tuo2" }],
    zhuyins: [{ char: "犛", pron: "ㄇㄠˊ" }, { char: "馱", pron: "ㄊㄨㄛˊ" }],
  },
  {
    en: "Desert Sumpter Beast",
    ja: "ラクラク駄獣",
    zhCN: "骆骆驮兽",
    zhTW: "駱駱馱獸",
    pronunciationJa: "ラクラクだじゅう",
    tags: [ "living-being", "enemy", "sumeru" ],
  },
  {
    en: "Rishboland Tiger",
    ja: "リシュボラン虎",
    zhCN: "长鬓虎",
    zhTW: "長鬢虎",
    pronunciationJa: "リシュボランとら",
    tags: [ "living-being", "enemy", "sumeru" ],
  },
  {
    en: "Spinocrocodile",
    ja: "スピノクロコ",
    zhCN: "棘冠鳄",
    zhTW: "棘冠鱷",
    tags: [ "living-being", "enemy" ],
  },
  {
    en: "Scorpion",
    ja: "サソリ",
    zhCN: "毒蝎",
    zhTW: "毒蠍",
    tags: [ "living-being", "enemy", "sumeru" ],
  },
  {
    en: "Red Vulture",
    ja: "赤鷲",
    zhCN: "赤鹫",
    zhTW: "赤鷲",
    tags: [ "living-being", "enemy" ],
  },
  {
    en: "Flying Serpent",
    ja: "トビヘビ",
    zhCN: "飞蛇",
    zhTW: "飛蛇",
    tags: [ "living-being", "enemy", "sumeru" ],
  },

  {
    en: "Gator Raja",
    ja: "ゲーターキング",
    zhCN: "鳄鱼大王",
    zhTW: "鱷魚大王",
    tags: [ "living-being", "enemy", "sumeru" ],
  },
  {
    en: "Rishboland Raja",
    ja: "リシュボラン虎のラージャ",
    zhCN: "长鬓虎罗阇",
    zhTW: "長鬢虎羅闍",
    tags: [ "living-being", "enemy", "sumeru" ],
    pinyins: [{ char: "阇", pron: "du1" }],
    zhuyins: [{ char: "闍", pron: "ㄉㄨ" }],
  },
  {
    en: "Sumpter Beastlord",
    ja: "駄獣大王",
    zhCN: "驮兽大王",
    zhTW: "馱獸大王",
    tags: [ "living-being", "enemy", "sumeru" ],
  },

  {
    en: "Jinni",
    ja: "ジンニー",
    zhCN: "镇灵",
    zhTW: "鎮靈",
    tags: [ "living-being", "sumeru" ],
  },
  {
    en: "Signal Spirit",
    ja: "風の悪霊",
    zhCN: "风之厄灵",
    zhTW: "風之厄靈",
    pronunciationJa: "かぜのあくりょう",
    tags: [ "living-being", "sumeru" ],
  },
  {
    en: "Pari",
    ja: "花霊",
    zhCN: "花灵",
    zhTW: "花靈",
    pronunciationJa: "かれい",
    tags: [ "living-being", "sumeru" ],
  },
  {
    en: "Khvarena",
    ja: "霊光",
    pronunciationJa: "れいこう",
    zhCN: "灵光",
    zhTW: "靈光",
    tags: [ "living-being", "sumeru" ],
  },
  {
    en: "countless motes of Khvarena",
    ja: "霊光百種",
    pronunciationJa: "れいこうひゃくしゅ",
    zhCN: "灵光百种",
    zhTW: "靈光百種",
    tags: [ "living-being", "sumeru" ],
    notes: "英語では霊光と区別されずに、単に Khvarena として表現される場合もある",
  },
  {
    en: "Farrwick",
    ja: "霊芯",
    zhCN: "灵芯",
    zhTW: "靈芯",
    pronunciationJa: "れいしん", // TODO Need Check
    tags: [ "living-being", "sumeru" ],
  },
  {
    en: "Residual Pari of the Forest",
    ja: "谷木の残霊",
    zhCN: "谷木的残灵",
    zhTW: "谷木的殘靈",
    tags: [ "living-being", "sumeru" ],
  },
  {
    en: "Khvarena Mayfly",
    ja: "霊光カゲロウ",
    zhCN: "灵光游蜉",
    zhTW: "靈光遊蜉",
    pronunciationJa: "れいこうカゲロウ",
    tags: [ "living-being", "sumeru" ],
    notes: "触れると散開し、時間内に3つ集めて元の場所に戻すことで宝箱をもらえる生物",
  },
  {
    en: "Amrita Mayfly",
    ja: "甘露カゲロウ",
    zhCN: "甘露游蜉",
    zhTW: "甘露遊蜉",
    pronunciationJa: "かんろカゲロウ", // TODO Need Check
    tags: [ "living-being", "sumeru" ],
    notes: "夜にシューニャター花の周りにいる生物",
  },
  {
    en: "Tent Tortoise",
    ja: "テントガメ",
    zhCN: "玳龟",
    zhTW: "玳龜",
    tags: [ "living-being", "sumeru" ],
    pinyins: [{ char: "玳", pron: "dai4" }],
    zhuyins: [{ char: "玳", pron: "ㄉㄞˋ" }],
  },

  //
  // Fontaine
  //
  {
    en: "Oceanid / Lochfolk",
    ja: "純水精霊",
    zhCN: "纯水精灵",
    zhTW: "純水精靈",
    pronunciationJa: "じゅんすいせいれい",
    variants: {
      ja: [ "純粋精霊" ],
    },
    tags: [ "fontaine", "living-being" ],
  },
  {
    en: "Melusine",
    ja: "メリュジーヌ",
    zhCN: "美露莘",
    zhTW: "美露莘",
    pinyins: [{ char: "莘", pron: "xin1" }],
    zhuyins: [{ char: "莘", pron: "ㄒㄧㄣ" }],
    tags: [ "fontaine", "living-being" ],
  },
  {
    en: "Guard Poodle",
    ja: "ガードドッグ",
    zhCN: "卫兵犬",
    zhTW: "衛兵犬",
    tags: [ "fontaine", "living-being" ],
  },
  {
    en: "Gentleman Poodle",
    ja: "ジェントルドッグ",
    zhCN: "绅士犬",
    zhTW: "紳士犬",
    tags: [ "fontaine", "living-being" ],
  },
  {
    en: "Lady Poodle",
    ja: "レディドッグ",
    zhCN: "淑女犬",
    zhTW: "淑女犬",
    tags: [ "fontaine", "living-being" ],
  },
  {
    en: "Redcrown Finch",
    ja: "赤カンムリガラ",
    zhCN: "红冠雀",
    zhTW: "紅冠雀",
    pronunciationJa: "あかカンムリガラ",
    tags: [ "fontaine", "living-being" ],
  },
  {
    en: "Umbrellafinch",
    ja: "カサガラ",
    zhCN: "伞雀",
    zhTW: "傘雀",
    tags: [ "fontaine", "living-being" ],
  },
  {
    en: "Magenta Fantail Pigeon",
    ja: "マゼンタクジャクバト",
    zhCN: "洋红扇尾鸽",
    zhTW: "洋紅扇尾鴿",
    tags: [ "fontaine", "living-being" ],
  },
  {
    en: "Violetgold Angler Gull",
    ja: "紫金オオズグロカモメ",
    zhCN: "紫金渔鸥",
    zhTW: "紫金漁鷗",
    pronunciationJa: "しきんオオズグロカモメ",
    tags: [ "fontaine", "living-being" ],
  },
  {
    en: "Bullet Barnacle",
    ja: "弾丸フジツボ",
    zhCN: "子弹藤壶",
    zhTW: "子彈藤壺",
    pronunciationJa: "だんがんフジツボ",
    tags: [ "living-being", "object", "fontaine" ],
  },
  {
    en: "Barnacle Bullet",
    ja: "フジツボ弾丸",
    zhCN: "藤壶子弹",
    zhTW: "藤壺子彈",
    pronunciationJa: "フジツボだんがん",
    tags: [ "fontaine" ],
    // related: [ "bullet-barnacle" ]
  },

  //
  // Natlan
  //
  {
    en: "Wayob",
    ja: "大霊",
    zhCN: "大灵",
    zhTW: "大靈",
    pronunciationJa: "たいれい",
    tags: [ "natlan", "living-being" ],
  },
  {
    en: "Blue Mountain Spoonbill",
    ja: "アオヤマヘラサギ",
    zhCN: "山蓝琵鹭",
    zhTW: "山藍琵鷺",
    tags: [ "natlan", "living-being" ],
  },
  {
    en: "Red Flamingo",
    ja: "赤フラミンゴ",
    zhCN: "赤鹳",
    zhTW: "赤鸛",
    tags: [ "natlan", "living-being" ],
  },
  {
    en: "Halberd-Crest Bird",
    ja: "ハルバード・サイチョウ",
    zhCN: "戟冠鸟",
    zhTW: "戟冠鳥",
    tags: [ "natlan", "living-being" ],
  },
  {
    en: "Thick-Feathered Ruffed Pheasant",
    ja: "エリマキキジ",
    zhCN: "厚羽围脖雉",
    zhTW: "厚羽圍脖雉",
    tags: [ "natlan", "living-being" ],
  },
  {
    en: "Flowcurrent Bird",
    ja: "漂流ペンギン",
    zhCN: "浮流鸟",
    zhTW: "浮流鳥",
    tags: [ "natlan", "living-being" ],
  },
  {
    en: "Flowfire Bird",
    ja: "浮燃ペンギン",
    zhCN: "浮燃鸟",
    zhTW: "浮燃鳥",
    tags: [ "natlan", "living-being" ],
  },
  {
    en: "Brown Deer",
    ja: "ブラウンディア",
    zhCN: "棕鹿",
    zhTW: "棕鹿",
    tags: [ "natlan", "living-being" ],
  },
  {
    en: "Alpaca",
    ja: "モコモコ駄獣",
    zhCN: "绵驮兽",
    zhTW: "綿馱獸",
    tags: [ "natlan", "living-being" ],
  },
  {
    en: "Capybara",
    ja: "カピバラ",
    zhCN: "豚兽",
    zhTW: "豚獸",
    tags: [ "natlan", "living-being" ],
  },
  {
    en: "Long-Necked Rhino",
    ja: "クビナガライノ",
    zhCN: "长颈角犀",
    zhTW: "長頸角犀",
    tags: [ "natlan", "living-being" ],
  },
  {
    en: "Flying Squirrel",
    ja: "フライングモモンガ",
    zhCN: "飞鼯",
    zhTW: "飛鼯",
    tags: [ "natlan", "living-being" ],
  },
  {
    en: "Pyro Crystalfly",
    ja: "炎晶蝶",
    zhCN: "火晶蝶",
    zhTW: "火晶蝶",
    tags: [ "natlan", "living-being" ],
  },
  {
    en: "Phlogiston Aphid",
    ja: "燃素ミツムシ",
    zhCN: "燃素蜜虫",
    zhTW: "燃素蜜蟲",
    tags: [ "natlan", "living-being" ],
  },
  {
    en: "Crystal Beetle",
    ja: "クリスタルビートル",
    zhCN: "固晶甲虫",
    zhTW: "固晶甲蟲",
    tags: [ "natlan", "living-being" ],
  },
  {
    en: "Cacaua Goat",
    ja: "ショコアトルヤギ",
    zhCN: "苦苦羊",
    zhTW: "苦苦羊",
    tags: [ "natlan", "living-being" ],
  },
  {
    en: "Ancient Scarlet-Plume Finch",
    ja: "朱羽ヤマガラ・古種",
    zhCN: "朱羽古团雀",
    zhTW: "朱羽古團雀",
    pronunciationJa: "しゅばねやまがら・こしゅ",  // TODO Need Check
    tags: [ "natlan", "living-being" ],
  },
  {
    en: "Ancient Firewalker Spoonbill",
    ja: "トモシビヘラサギ・古種",
    zhCN: "游炎古琵鹭",
    zhTW: "遊炎古琵鷺",
    pronunciationJa: "トモシビヘラサギ・こしゅ",
    tags: [ "natlan", "living-being" ],
  },
] as const satisfies SourceWord[];
