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
