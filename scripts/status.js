import { listCustomTranslations, listGlossaries, login } from "../libs/translator.js";

const accessToken = await login();
const customTranslations = await listCustomTranslations({ accessToken });

console.info("# List of Custom Translations\n");
for (const customTranslation of customTranslations) {
  console.info(`- ${customTranslation.title} (ID: ${customTranslation.id})`);
}

console.info("\n");

const glossaries = await listGlossaries({ accessToken });

console.info("# List of Glossaries:");

for (const glossary of glossaries) {
  console.info(`- ${glossary.name} (ID: ${glossary.id})`);
}
