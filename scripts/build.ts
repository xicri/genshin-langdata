import { copyFile, mkdir, rm } from "node:fs/promises";
import { resolve } from "node:path";
import { Dictionary } from "../libs/dictionary.js";

await rm(resolve(import.meta.dirname, "../dist"), { recursive: true, force: true });
await mkdir(resolve(import.meta.dirname, "../dist/redirect/"), { recursive: true });

const dictionary = new Dictionary();
await dictionary.load();
await dictionary.buildJSON(resolve(import.meta.dirname, "../dist"));

await Promise.all([
  copyFile(resolve(import.meta.dirname, "../dataset/tags.json"), resolve(import.meta.dirname, "../dist/tags.json")),
  copyFile(resolve(import.meta.dirname, "../dataset/redirect/words.json"), resolve(import.meta.dirname, "../dist/redirect/words.json")),
  copyFile(resolve(import.meta.dirname, "../dataset/redirect/tags.json"), resolve(import.meta.dirname, "../dist/redirect/tags.json")),
]);
