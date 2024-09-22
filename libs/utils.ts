import { readdir } from "node:fs/promises";
import { join } from "node:path";
import { flatten } from "lodash-es";
import type { SourceWord } from "./types.ts";

/**
 * Load all the *.ts files in the directory and concatenate contents to one array.
 * @param dirPath - path to the directory containing JSONs
 * @returns concatenated JS array object of the loaded JSONs
 */
export async function importAll(dirPath: string): Promise<SourceWord[]> {
  const fileNames = await readdir(dirPath);

  const datasets: SourceWord[][] = await Promise.all(
    fileNames.map((fileName) => import(join(dirPath, fileName)))
  );

  return flatten(datasets);
}

/**
 * Convert JSON to CSV or TSV
 * @param format - target format. "csv" or "tsv".
 * @param objs - object to convert to CSV or TSV
 * @param options - options
 * @param options.header - add header or not
 * @param options.quotes - if false, do not enclose values with doublequotes. default is true.
 * @returns CSV or TSV string
 */
export function jsonTo(
  format: string,
  objs: { [key: string]: string | number | undefined }[],
  options = {
    header: true,
    quotes: true,
  },
): string {
  if (!Array.isArray(objs)) {
    throw new Error("Given JSON must be an array.");
  }

  if (format !== "csv" && format !== "tsv") {
    throw new Error(`Invalid format ${format}; Only "csv" and "tsv" are supported.`);
  }

  // List all of the keys
  const keys: string[] = [];
  for (const obj of objs) {
    for (const key of Object.keys(obj)) {
      if (!keys.includes(key)) {
        keys.push(key);
      }
    }
  }

  // Convert object to lines of CSV
  const lines = objs.map(obj =>
    keys.map(key => {
      let val = obj[key]?.replaceAll("\"", "\"\"");

      if (typeof val === "undefined") {
        val = "";
      } else {
        // wrap with quotes if needed
        if (options.quotes === true) {
          val = `"${val}"`;
        }
      }

      return val;
    }).join(format === "csv" ? "," : "\t")
  ).join("\r\n");

  const headerLine = keys.map(key => `"${key}"`).join(format === "csv" ? "," : "\t");

  return (options.header ? headerLine + "\r\n" : "") + lines;
}
