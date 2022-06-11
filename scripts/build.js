import { copyFile } from "fs/promises";
import { resolve } from "path";
import { fileURLToPath } from "url";
import { Dictionary } from "../libs/dictionary.js";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

const dictionary = new Dictionary();
await dictionary.load();
await dictionary.buildJSON(resolve(__dirname, "../dist"));

await copyFile(resolve(__dirname, "../dataset/tags.json"), resolve(__dirname, "../dist/tags.json"));
