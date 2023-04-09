"use strict";

module.exports = {
  root: true,
  extends: [
    "xicri/node",
  ],

  parserOptions: {
    sourceType: "module",
  },

  rules: {
    "node/no-unpublished-import": "off",
    "jest/valid-expect": [ "error", { maxArgs: 2 }], // jest-expect-message requires two args for `expect()`
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
