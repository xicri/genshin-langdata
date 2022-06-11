"use strict";

module.exports = {
  root: true,
  extends: [
    // "xicri/node", // TODO
    "plugin:jsonc/recommended-with-json5",
  ],

  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
  },

  plugins: [
    "jsonc",
  ],

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
      // extends: "xicri/jest", // TODO
      rules: {
        // TODO
        // "jest/expect-expect": [ "error", {
        //   assertFunctionNames: [ "expect", "ok" ],
        // }],
        "jest/no-conditional-expect": "off",
      },
    },
    {
      files: [ "*.json", "*.json5", "*.jsonc" ],
      parser: "jsonc-eslint-parser",
      rules: {
        "jsonc/array-bracket-spacing": [ "error", "always", {
          objectsInArrays: false,
          arraysInArrays: false,
        }],
        "jsonc/comma-style": [ "error", "last" ],
        "jsonc/indent": [ "error", 2 ],
        "jsonc/key-spacing": [ "error", {
          beforeColon: false,
          afterColon: true,
          mode: "minimum",
        }],
        "jsonc/object-curly-spacing": [ "error", "always", {
          arraysInObjects: false,
          objectsInObjects: false,
        }],
      },
    },
    {
      files: [ "*.json5" ],
      parser: "jsonc-eslint-parser",
      rules: {
        "jsonc/comma-dangle": [ "error", {
          arrays: "always-multiline",
          objects: "always-multiline",
        }],
      },
    },
  ],
};
