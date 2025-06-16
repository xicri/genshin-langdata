import { tags } from "../dataset/tags.ts";

type TagID = keyof typeof tags;

/** Word object */
export type Word = {
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
  /** Traditional Chinese translation */
  zhTW?: string;
  /** Pinyin for rarely-used characters (生僻字) */
  pinyins?: {
    /** A single rarely-used character (生僻字) included in `zhCN` */
    char: string;
    /** The pronunciation for `pinyins.char` */
    pron: string;
  }[];
  /** Zhuyin for rarely-used characters (生僻字) */
  zhuyins?: {
    /** A single rarely-used character (生僻字) included in `zhTW` */
    char: string;
    /** The pronunciation for `zhuyins.char` */
    pron: string;
  }[];
  /** Note in Japanese */
  notes?: string;
  /** Note in English */
  notesEn?: string;
  /** Note in Simplified Chinese */
  notesZh?: string;
  /** Note in Traditional Chinese */
  notesZhTW?: string;
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
    /** Example sentence in Traditional Chinese */
    zhTW?: string;
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
    /** Typos or other names in Traditional Chinese */
    zhTW?: string[];
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
export type SourceWord = Omit<Word, "id" | "createdAt" | "updatedAt"> & {
  id?: Word["id"];
};

export type Tags = {
  [tagId: string]: {
    en: string,
    ja: string,
    "zh-CN": string,
    "zh-TW": string,
    title: {
      en: string,
      ja: string,
      "zh-CN": string,
      "zh-TW": string,
    }
  }
};
