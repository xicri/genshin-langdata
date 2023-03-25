# genshin-langdata

This repository contains the translation dataset for [Genshin Dictionary](https://genshin-dictionary.com) ([GitHub](https://github.com/xicri/genshin-dictionary)) and [Genshin Machine Translation](https://translate.genshin-dictionary.com/) ([GitHub](https://github.com/xicri/genshin-translate)).

## Just want to access translation data programatically?

Use API: https://dataset.genshin-dictionary.com/words.json

[API document](https://genshin-dictionary.com/opendata/) (Currently only Japanese version available. English version is planned.)

## Development

Translation dataset for Genshin Dictionary is included in [dataset/](https://github.com/xicri/genshin-langdata/tree/main/dataset) directry.
The dataset is written in JSON5.

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

### Validation

JSON5 validation is not mandatory process because it automatically runs on GitHub Actions when you open a Pull Request.
However, if you want to validate JSON5s on your local machine, follow the insturuction below.

You need following requirements:

- Node.js: The latest LTS version recommended
- npm: The latest version recommended
- (Windows only) PowerShell 7+
  - Some npm scripts needs `&&` support

To run validation:

```shell
$ cd /path/to/genshin-langdata
$ npm ci
$ npm test
$ npm run lint
```

### Utility scripts

`npm run todo` lists the words without Chinese translation.

Example:

```shell
$ npm run todo

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
