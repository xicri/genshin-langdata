import { join } from "node:path";
import { loadJSON } from "../libs/utils.js";

const srcCharacters = await loadJSON(
  join(import.meta.dirname, "../dataset/dictionary/characters.json5"),
  { json5: true },
);
const builtJSON = await loadJSON(
  join(import.meta.dirname, "../dist/words.json")
);

const srcLumine = srcCharacters.find(characterWord => characterWord.en?.includes("Lumine"));
const distLumine = builtJSON.find(characterWord => characterWord.en?.includes("Lumine"));

delete distLumine.id;
delete distLumine.createdAt;
delete distLumine.updatedAt;

if (!Object.is(srcLumine, distLumine)) {
  throw new Error(`
Generated JSON is not identical to the source.
Source object: ${JSON.stringify(srcLumine, null, 2)}

Generated object: ${JSON.stringify(distLumine, null, 2)}
`);
}
