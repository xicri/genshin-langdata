"use strict";

const { join } = require("node:path");

module.exports = {
  root: true,
  extends: [
    "xicri/node",
  ],

  parserOptions: {
    ecmaVersion: 2024,
    sourceType: "module",
    project: join(__dirname, "tsconfig.json"),
  },

  rules: {
    "node/no-unpublished-import": "off",
    // Disabled because TypeScript validate it instead
    "vitest/valid-expect": "off",
  },

  overrides: [
    {
      files: [ "*.cjs" ],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
};
