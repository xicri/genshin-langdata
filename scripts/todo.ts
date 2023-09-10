import { readdir, readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { SourceWord } from "../libs/types.ts";

const dicDir = resolve(import.meta.dirname, "../dataset/dictionary");
const tsDicFileNames = await readdir(dicDir);

console.info("# Words without Chinese translation");

for (const tsDicFileName of tsDicFileNames) {
  const dicWords = await import(resolve(dicDir, tsDicFileName)) as SourceWord[];
  const wordsWithoutChinese = dicWords.filter(word => !word.zhCN);

  if (0 < wordsWithoutChinese.length) {
    console.info(""); // line break
    console.info(`  ## ${ tsDicFileName }`);
  }

  for (const word of wordsWithoutChinese) {
    console.info(`    - ${word.en} (${word.ja})`);
  }
}
