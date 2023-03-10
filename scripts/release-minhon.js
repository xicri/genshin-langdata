import { resolve } from "path";
import { fileURLToPath } from "url";
import {
  createGlossary,
  deleteGlossary,
  login,
  listGlossaries,
  updateGlossariesInCustomTranslation,
  uploadGlossaryItems,
} from "../libs/translator.js";
import { jsonTo, loadJSONs } from "../libs/utils.js";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

// skip on local env
if (process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "preview") {
  throw new Error("Skipping updating MinHon glossaries");
}
// Skip on the PR from forked repository
if (process.env.NODE_ENV === "preview" && !process.env.MINHON_API_KEY && !process.env.MINHON_API_SECRET && !process.env.MINHON_LOGIN_ID) {
  console.info("Skipping updating MinHon glossaries due to missing credentials.");
  process.exit(0);
}

//
// Register Glossaries
//
const words = [].concat(
  await loadJSONs(resolve(__dirname, "../dataset/dictionary"), { json5: true }),
  await loadJSONs(resolve(__dirname, "../dataset/translator"), { json5: true }),
);

const targetEnJaGlossaryName = `genshin-en-ja-${process.env.NODE_ENV}`;
const targetJaEnGlossaryName = `genshin-ja-en-${process.env.NODE_ENV}`;

const accessToken = await login();
const glossaries = await listGlossaries({ accessToken });

// en -> ja
let enToJaTranslations = [];

for (const word of words) {
  if (word._meta?.translator === false || word._meta?.translator?.enToJa === false) {
    continue;
  }

  if (!(word.en && word.ja)) {
    continue;
  }

  enToJaTranslations.push({
    en: word.en,
    ja: word.ja,
  });

  const variants = word.variants?.en?.map(variant => ({
    en: variant,
    ja: word.ja,
  }));

  if (variants) {
    enToJaTranslations = enToJaTranslations.concat(variants);
  }
}

const enJaTSV = jsonTo("tsv", enToJaTranslations, { header: false, quotes: false });
const enJaGlossary = glossaries.find(glossary => glossary.name === targetEnJaGlossaryName);
if (enJaGlossary) {
  await deleteGlossary(enJaGlossary.id, { accessToken });
}
const newEnToJaGlossaryID = await createGlossary("en", "ja", { accessToken });
await uploadGlossaryItems(enJaTSV, newEnToJaGlossaryID, { accessToken });

// ja -> en
let jaToEnTranslations = [];

for (const word of words) {
  if (word._meta?.translator === false || word._meta?.translator?.jaToEn === false) {
    continue;
  }

  if (!(word.en && word.ja)) {
    continue;
  }

  jaToEnTranslations.push({
    ja: word.ja,
    en: word.en,
  });

  const variants = word.variants?.ja?.map(variant => ({
    ja: variant,
    en: word.en,
  }));

  if (variants) {
    jaToEnTranslations = jaToEnTranslations.concat(variants);
  }
}

const jaEnTSV = jsonTo("tsv", jaToEnTranslations, { header: false, quotes: false });
const jaEnGlossary = glossaries.find(glossary => glossary.name === targetJaEnGlossaryName);
if (jaEnGlossary) {
  await deleteGlossary(jaEnGlossary.id, { accessToken });
}
const newJaToEnGlossaryID = await createGlossary("ja", "en", { accessToken });
await uploadGlossaryItems(jaEnTSV, newJaToEnGlossaryID, { accessToken });

//
// Register Custom Translation
//
await updateGlossariesInCustomTranslation({
  id: process.env.NODE_ENV === "production" ? 1689 : 1687,
  srcLang: "en",
  destLang: "ja",
  glossaryID: newEnToJaGlossaryID,
  reverseGlossaryID: newJaToEnGlossaryID,
  accessToken,
});

await updateGlossariesInCustomTranslation({
  id: process.env.NODE_ENV === "production" ? 1688 : 1685,
  srcLang: "ja",
  destLang: "en",
  glossaryID: newJaToEnGlossaryID,
  reverseGlossaryID: newEnToJaGlossaryID,
  accessToken,
});
