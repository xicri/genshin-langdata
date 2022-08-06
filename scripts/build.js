import { copyFile, mkdir } from "fs/promises";
import { resolve } from "path";
import { fileURLToPath } from "url";
import { Dictionary } from "../libs/dictionary.js";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

await mkdir(resolve(__dirname, "../dist/redirect/"), { recursive: true });

const dictionary = new Dictionary();
await dictionary.load();
await dictionary.buildJSON(resolve(__dirname, "../dist"));

await Promise.all([
  copyFile(resolve(__dirname, "../dataset/tags.json"), resolve(__dirname, "../dist/tags.json")),
  copyFile(resolve(__dirname, "../dataset/redirect/words.json"), resolve(__dirname, "../dist/redirect/words.json")),
  copyFile(resolve(__dirname, "../dataset/redirect/tags.json"), resolve(__dirname, "../dist/redirect/tags.json")),
]);
