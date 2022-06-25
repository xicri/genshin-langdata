"use strict";

module.exports = {
  root: true,
  extends: [
    "xicri/node",
  ],

  parserOptions: {
    sourceType: "module",
  },

  // top-levet await is not supported yet in ESLint 7
  ignorePatterns: [ "scripts/build-json.mjs" ],

  rules: {
    "node/no-unpublished-import": "off",
  },

  overrides: [
    {
      files: [ "*.cjs" ],
      parserOptions: {
        sourceType: "script",
      },
    },
    {
      files: [ "*.test.js", "*.test.mjs" ],
      extends: "xicri/jest",
    },
  ],
};
