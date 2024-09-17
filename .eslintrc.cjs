"use strict";

module.exports = {
  root: true,
  extends: [
    "xicri/node",
  ],

  parserOptions: {
    ecmaVersion: 2024,
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
  ],
};
