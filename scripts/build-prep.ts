import { readdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

/** Create dataset/dictionary/index.ts */
const buildDictionaryIndexTs = async (): Promise<void> => {
  const dictRootPath = join(import.meta.dirname, "../dataset/dictionary")
  const tsFileNames = (await readdir(dictRootPath))
    .filter((tsFileName) => tsFileName !== "index.ts");

  const indexTsText =
    "import type { SourceWord } from \"../../libs/types.ts\";\n"
    + tsFileNames
      .map((tsFileName, i) => `import wordset${ i } from "./${tsFileName}";`)
      .join("\n")
    + `\nexport const words: SourceWord[] = ([] as SourceWord[]).concat(${
      tsFileNames.map((_, i) => `wordset${ i }`).join(",")
    })`;

  await writeFile(join(dictRootPath, "index.ts"), indexTsText);
};

await Promise.all([
  buildDictionaryIndexTs(),
]);
