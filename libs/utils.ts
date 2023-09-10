/**
 * Convert JSON to CSV or TSV
 * @param {string} format - target format. "csv" or "tsv".
 * @param {object} objs - object to convert to CSV or TSV
 * @param {object} options - options
 * @param {boolean} options.header - add header or not
 * @param {boolean} options.quotes - if false, do not enclose values with doublequotes. default is true.
 * @returns {string} CSV or TSV string
 */
export function jsonTo(format, objs, options = { header: true, quotes: true }) {
  if (!Array.isArray(objs)) {
    throw new Error("Given JSON must be an array.");
  }

  if (format !== "csv" && format !== "tsv") {
    throw new Error(`Invalid format ${format}; Only "csv" and "tsv" are supported.`);
  }

  // List all of the keys
  const keys = [];
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
