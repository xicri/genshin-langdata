import { z } from "zod";
import { tags } from "./tags.ts";

type TagID = keyof typeof tags;

const WordSchemaBase = {
  /** English translation */
  en: z.string(),
  /** Japanese translation */
  ja: z.string().optional(),
  /** Pronunciation for Japanese in Hiragana and Katakana */
  pronunciationJa: z.string().optional(),
  /** Simplified Chinese translation */
  zhCN: z.string().optional(),
  /** Traditional Chinese translation */
  zhTW: z.string().optional(),
  /** Pinyin for rarely-used characters (生僻字) */
  pinyins: z.object({
    /** A single rarely-used character (生僻字) included in `zhCN` */
    char: z.string(),
    /** The pronunciation for `pinyins.char` */
    pron: z.string(),
  }).array(). optional(),
  /** Note in Japanese */
  notes: z.string().optional(),
  /** Note in English */
  notesEn: z.string().optional(),
  /** Note in Simplified Chinese */
  notesZh: z.string().optional(),
  /** Tag IDs for this word */
  tags: z
    .enum(Object.keys(tags) as [ TagID, ...TagID[] ])
    .array()
    .optional(),
  /**
   * Example sentences.
   * Almost all examples are cited from the game, PVs, or other official resources.
   */
  examples: z.object({
    /** Example sentence in English */
    en: z.string(),
    /** Example sentence in Japanese */
    ja: z.string(),
    /** Example sentence in Simplified Chinese */
    zhCN: z.string().optional(),
    /** Example sentence in Traditional Chinese */
    zhTW: z.string().optional(),
    /** Reference of this sentence */
    ref: z.string().optional(),
    /** Reference URL of this sentence if available */
    refURL: z.string().optional(),
  }).array().optional(),
  /** Typical typos, unofficial short names or other names */
  variants: z.object({
    /** Typos or other names in English */
    en: z.string().array().optional(),
    /** Typos or other names in Japanese */
    ja: z.string().array().optional(),
    /** Typos or other names in Simplified Chinese */
    zhCN: z.string().array().optional(),
    /** Typos or other names in Traditional Chinese */
    zhTW: z.string().array().optional(),
  }).optional(),
};

export const SourceWordSchema = z.object({
  ...WordSchemaBase,

  /** Slug for this word */
  id: z.string().optional(),
});

export const BuiltWordSchema = z.object({
  ...WordSchemaBase,

  /** Slug for this word */
  id: z.string(),
  /** The date this word is added */
  createdAt: z.string().optional(),
  /** The date this word is updated */
  updatedAt: z.string().optional(),
});

WordSchema.parse({ username: "Ludwig" });

export type SourceWord = z.infer<typeof SourceWordSchema>;
export type BuiltWord = z.infer<typeof BuiltWordSchema>;
