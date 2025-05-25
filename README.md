# genshin-langdata

This repository contains the translation dataset for [Genshin Dictionary](https://genshin-dictionary.com) ([GitHub](https://github.com/xicri/genshin-dictionary)) and [Genshin Machine Translation](https://translate.genshin-dictionary.com/) ([GitHub](https://github.com/xicri/genshin-translate)).

## Just want to access translation data programatically?

Use API: https://dataset.genshin-dictionary.com/words.json

[API document](https://genshin-dictionary.com/opendata/) (Currently only Japanese version available. English version is planned.)

## Development

Translation dataset for Genshin Dictionary is included in [dataset/](https://github.com/xicri/genshin-langdata/tree/main/dataset) directry.
The dataset is written in JSON5.

### Requirements

- Node.js (The latest LTS recommended)
- Corepack (The latest version recommended)
  - Corepack should be bundled with Node.js as of Node.js v22, but it is planned to be separately distributed in the future versions.

### Set up

```sh
cd /path/to/genshin-langdata
corepack use pnpm@10
pnpm install
```

### Directory structure

```
dataset/
 ├ dictionary/ ― Dataset for Genshin Dictionary. Also used for Genshin Machine Translate.
 │ ├ artifacts.json5
 │ ├ characters.json5
 │ ︙
 │
 ├ translator/ ― Additional translation dataset for Genshin Machine Translate. This is not used for Genshin Dictionary.
 │ ├ characters.json5
 │ ├ domains.json5
 │ ︙
 │
 └ tags.json ― list of tags attached to each word in Genshin Dictionary.
```

### JSON5 format

See [API document](https://genshin-dictionary.com/opendata/). (Currently only Japanese version available. English version is planned.)

#### pinyins

When you add Chinese pronunciation in pinyin, you can use tone numbers (e.g. `qia3`) in source TypeScript files under dataset/dictionary/. It is transformed to tone letters (e.g. `qiǎ`) on build.

e.g.

```ts
  {
    // ...
    zhCN: "天云峠",
    pinyins: [{ char: "峠", pron: "qia3" }],
    // ...
  },
```
↓
```json
  {
    // ...
    "zhCN": "天云峠",
    "pinyins": [{ "char": "峠", "pron": "qiǎ" }],
    // ...
  },
```

### Validation

JSON5 validation is not mandatory process because it automatically runs on GitHub Actions when you open a Pull Request.
However, if you want to validate JSON5s on your local machine, follow the insturuction below.

You need following requirements:

- Node.js: The latest LTS version recommended
- (Windows only) PowerShell 7+
  - Some npm scripts needs `&&` support

To run validation:

```shell
$ pnpm run test
$ pnpm run lint
```

### Utility scripts

`pnpm run todo` lists the words without Chinese translation.

Example:

```shell
$ pnpm run todo

> todo
> node scripts/todo.js

# Words without Chinese translation

  ## characters.json5
    - Snezhevna (シュナイツェフナ)
    - Snezhevich (シュナイツェビッチ)
    ...

  ## quests.json5
    - Break the Sword Cemetery Seal (剣塚封印を探索)
    - Fishing For Jade (海上拾玉)
    ...
```
