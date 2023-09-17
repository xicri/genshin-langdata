import { readdir, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";
import JSON5 from "json5";

export async function getWordsWithoutSimplifiedChinese() {
  const __dirname = fileURLToPath(new URL(".", import.meta.url));
  const dicDir = resolve(__dirname, "../dataset/dictionary");
  const json5FileNames = await readdir(dicDir);

  const wordsWithoutSimplifiedChinese = [];

  for (const json5FileName of json5FileNames) {
    const json5Path = resolve(dicDir, json5FileName);
    const json5Dic = await readFile(json5Path, { encoding: "utf-8" });
    const words = JSON5.parse(json5Dic).filter(word => !word.zhCN);

    if (Array.isArray(words) && 0 < words.length) {
      wordsWithoutSimplifiedChinese.push({
        filename: json5FileName,
        words,
      });
    }
  }

  return wordsWithoutSimplifiedChinese;
}
