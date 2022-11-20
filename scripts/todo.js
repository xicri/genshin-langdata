import { readdir, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";
import JSON5 from "json5";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const dicDir = resolve(__dirname, "../dataset/dictionary");
const json5FileNames = await readdir(dicDir);

console.info("# Words without Chinese translation");

for (const json5FileName of json5FileNames) {
  const json5Path = resolve(dicDir, json5FileName);
  const json5Dic = await readFile(json5Path, { encoding: "utf-8" });

  const wordsWithoutChinese = JSON5.parse(json5Dic)
    .filter(word => !word.zhCN);

  if (0 < wordsWithoutChinese.length) {
    console.info(""); // line break
    console.info(`  ## ${json5FileName}`);
  }

  for (const word of wordsWithoutChinese) {
    console.info(`    - ${word.en} (${word.ja})`);
  }
}
