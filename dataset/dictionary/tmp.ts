import type { SourceWord } from "../schema.ts";

export default [
  // Rarelity (How many ★) unknown
  {
    en: "Tripes du Port",
    ja: "ポート風トリップ",
    zhCN: "港湾牛肚",
    tags: [ "food" ],
  },
  {
    en: "Tomates Narbonnaises",
    ja: "ナルボンヌのトマトファルシ",
    zhCN: "纳博内番茄盅",
    tags: [ "food" ],
  },
  {
    en: "Crepes Suzette",
    ja: "クレームクレープシュゼット", // TODO Check if it is HoYoverse's mistype
    zhCN: "桔桔薄饼",
    tags: [ "food" ],
  },
] as const satisfies SourceWord[];
