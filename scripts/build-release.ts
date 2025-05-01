import { mkdir, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { Dictionary } from "../libs/dictionary.ts";
import { tags } from "../dataset/tags.ts";
import wordRedirects from "../dataset/redirect/words.ts";
import tagRedirects from "../dataset/redirect/tags.ts";

await rm(resolve(import.meta.dirname, "../dist"), { recursive: true, force: true });
await mkdir(resolve(import.meta.dirname, "../dist/redirect/"), { recursive: true });

const dictionary = new Dictionary();
await dictionary.load();
await dictionary.buildJSON(resolve(import.meta.dirname, "../dist"));

await Promise.all([
  writeFile(
    resolve(import.meta.dirname, "../dist/tags.json"),
    JSON.stringify(tags, undefined, 2),
  ),
  writeFile(
    resolve(import.meta.dirname, "../dist/redirect/words.json"),
    JSON.stringify(wordRedirects, undefined, 2),
  ),
  writeFile(
    resolve(import.meta.dirname, "../dist/redirect/tags.json"),
    JSON.stringify(tagRedirects, undefined, 2),
  ),
]);
