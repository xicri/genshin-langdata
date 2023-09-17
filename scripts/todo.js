import { getWordsWithoutSimplifiedChinese } from "../libs/todo.js";

console.info("# Words without Simplified Chinese translation");
console.info(""); // line break

for (const file of await getWordsWithoutSimplifiedChinese()) {
  console.info(""); // line break
  console.info(`  ## ${file.filename}`);

  for (const word of file.words) {
    console.info(`    - ${word.en} (${word.ja})`);
  }
}
