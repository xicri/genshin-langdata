import { core, nodejs } from "@xicri/configs/eslint";

const configs = [
  {
    ignores: [
      "./.nuxt/**",
      "./dist/**",
      "./dataset/**",
    ],
  },

  ...core,
  ...nodejs,

  {
    // Do not add `files: [ "*" ],` here.

    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  {
    files: [ "**/*.ts", "**/*.js" ],
    rules: {
      "node/no-unpublished-import": "off",
      // Disabled because TypeScript validate it instead
      "vitest/valid-expect": "off",
    },
  },
];

export default configs;
