import { tags } from "./tags.ts";

type TagID = keyof typeof tags;

/** Word object */
export type BuiltWord = {
  /** Slug for this word */
  id: string;
  /** English translation */
  en: string;
  /** Japanese translation */
  ja?: string;
  /** Pronunciation for Japanese in Hiragana and Katakana */
  pronunciationJa?: string;
  /** Simplified Chinese translation */
  zhCN?: string;
  /** Pinyin for rarely-used characters (生僻字) */
  pinyins?: {
    /** A single rarely-used character (生僻字) included in `zhCN` */
    char: string;
    /** The pronunciation for `pinyins.char` */
    pron: string;
  }[];
  /** Note in Japanese */
  notes?: string;
  /** Note in English */
  notesEn?: string;
  /** Note in Simplified Chinese */
  notesZh?: string;
  /** Tag IDs for this word */
  tags?: TagID[];
  /**
   * Example sentences.
   * Almost all examples are cited from the game, PVs, or other official resources.
   */
  examples?: {
    /** Example sentence in English */
    en: string;
    /** Example sentence in Japanese */
    ja: string;
    /** Example sentence in Simplified Chinese */
    zhCN?: string;
    /** Reference of this sentence */
    ref?: string;
    /** Reference URL of this sentence if available */
    refURL?: string;
  }[];
  /** Typical typos, unofficial short names or other names */
  variants?: {
    /** Typos or other names in English */
    en?: string[];
    /** Typos or other names in Japanese */
    ja?: string[];
    /** Typos or other names in Simplified Chinese */
    zhCN?: string[];
  };
  /** The date this word is added */
  createdAt?: string;
  /** The date this word is updated */
  updatedAt?: string;
};

/**
 * Word object for the source datasets in this repository.
 * Use `Word` type instead for public opendata.
 */
export type SourceWord = Omit<BuiltWord, "id" | "createdAt" | "updatedAt"> & {
  id?: BuiltWord["id"];
};
