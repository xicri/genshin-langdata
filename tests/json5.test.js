import { ok } from "assert";

import tags from "../dataset/tags.json";
import words from "../dist/words.json";

function isURL(urlStr) {
  try {
    new URL(urlStr);
    return true;
  } catch (err) {
    if (err.name === "TypeError") { // invalid URL
      return false;
    } else {
      throw err;
    }
  }
}

test("words[].id only includes alphanumerics & hypnens", async () => {
  for (const word of words) {
    expect(word.id).toMatch(/^[a-z0-9-]+$/);
  }
});

test("if dictionary JSON5s has no duplicate words", async () => {
  for (const { id, en, ja, zhCN } of words) {
    ok(words.filter(word => word.en === en).length === 1, `Duplicate English: ${en}`);
    if (ja) {
      ok(
        words.filter(word => word.ja === ja).length === 0 ||
        words.filter(word => word.ja === ja).length === 1,
        `Duplicate Japanese: ${ja}`
      );
    }
    if (zhCN) {
      ok(
        words.filter(word => word.zhCN === zhCN).length === 0 ||
        words.filter(word => word.zhCN === zhCN).length === 1,
        `Duplicate Chinese: ${zhCN}`
      );
    }

    if (typeof id !== "undefined") {
      ok(words.filter(word => word.id === id).length === 1, `Duplicate ID: ${id}`);
    }
  }
});

test("if dictionary JSON does not have invalid keys", async () => { // eslint-disable-line complexity
  for (const word of words) {
    const keys = Object.keys(word);

    // Required keys
    ok(keys.includes("en"), `Following word does not include English: ${JSON.stringify(word, null, 2)}`);
    ok(keys.includes("zhCN") || keys.includes("ja"), `Following word does not include neither Japanese nor Chinese: ${JSON.stringify(word, null, 2)}`);

    // Check if invalid key exists
    for (const key of keys) {
      ok(
        key === "id" ||
        key === "en" ||
        key === "ja" ||
        key === "zhCN" ||
        key === "pronunciationJa" ||
        key === "notes" ||
        key === "tags" ||
        key === "variants" ||
        key === "examples" ||
        key === "_meta" ||
        key === "createdAt" ||
        key === "updatedAt",
        `"${key}" is not a valid key.`
      );
    }

    if (word.variants) {
      for (const variantsKey of Object.keys(word.variants)) {
        ok(
          variantsKey === "en" ||
          variantsKey === "ja" ||
          variantsKey === "zhCN" ,
          `"variants.${variantsKey}" is not a valid key.`
        );
      }
    }

    if (word._meta) {
      expect(typeof word._meta).toBe("object");

      if (typeof word._meta.translator !== "undefined") {
        ok(
          typeof word._meta.translator === "object" ||
          typeof word._meta.translator === "boolean",
          `
_meta.translator must be object or boolean but actually it is ${typeof word._meta.translator}.
Value: ${word._meta.translator}
`
        );

        if (typeof word._meta.translator === "object") {
          ok(
            typeof word._meta.translator.enToJa === "boolean" &&
            typeof word._meta.translator.jaToEn === "boolean",
            `
_meta.translator.enToJa and _meta.translator.jaToEn must be boolean but actually enToJa is ${typeof typeof word._meta.translator.enToJa} and jaToEn is ${typeof word._meta.translator.jaToEn}.
Value of enToJa: ${word._meta.translator.enToJa}
Value of jaToEn: ${word._meta.translator.jaToEn}
`
          );
        }
      }
    }

    if (word.examples) {
      for (const example of word.examples) {
        for (const exampleKey of Object.keys(example)) {
          ok(
            exampleKey === "en" ||
            exampleKey === "ja" ||
            exampleKey === "zhCN" ||
            exampleKey === "ref" ||
            exampleKey === "refURL",
            `"examples[].${exampleKey}" is not a valid key.`
          );
        }
      }
    }
  }
});

test("if property values of dictionary JSON complies the format.", async () => {
  const tagIDs = Object.keys(tags);

  for (const word of words) {
    expect(typeof word.id).toBe("string");
    expect(typeof word.en).toBe("string");
    if (word.ja) {
      expect(typeof word.ja).toBe("string");
    }
    if (word.zhCN) {
      expect(typeof word.zhCN).toBe("string");
    }

    if (typeof word.notes !== "undefined") {
      expect(typeof word.notes).toBe("string");
    }

    if (typeof word.pronunciationJa !== "undefined" && word.pronunciationJa !== null) {
      expect(word.pronunciationJa).toMatch(/^[ぁ-んァ-ヴー、・…〇!?/ ]+$/);
    }

    if (typeof word.tags !== "undefined" && word.tags !== null) {
      for (const tag of word.tags) {
        ok(tagIDs.includes(tag), `Invalid tag ${tag} is found in the word ${word.en} (${word.ja})`);
      }
    }

    if (word.variants) {
      expect(typeof word.variants).toBe("object");

      for (const lang of [ "en", "ja", "zhCN" ]) {
        if (typeof word.variants?.[lang] !== "undefined" && word.variants?.[lang] !== null) {
          ok(Array.isArray(word.variants[lang]), `word.variants.${lang} should be array but actually ${word.variants[lang]}`);

          for (const variant of word.variants[lang]) {
            expect(typeof variant).toBe("string");
          }
        }
      }
    }

    if (typeof word.examples !== "undefined" && word.examples !== null) {
      for (const example of word.examples) {
        expect(typeof example.en).toBe("string");
        expect(typeof example.ja).toBe("string");
        if (example.zhCN) {
          expect(typeof example.zhCN).toBe("string");
        }

        if (typeof example.ref !== "undefined") {
          expect(typeof example.ref).toBe("string");
        }

        if (typeof example.refURL !== "undefined") {
          ok(isURL(example.refURL), `Invalid refURL of ${word.en}: ${example.refURL}`);
        }
      }
    }
  }
});
