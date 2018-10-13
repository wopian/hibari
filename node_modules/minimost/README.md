# minimost

[![NPM version](https://img.shields.io/npm/v/minimost.svg?style=flat)](https://npmjs.com/package/minimost) [![NPM downloads](https://img.shields.io/npm/dm/minimost.svg?style=flat)](https://npmjs.com/package/minimost) [![Build Status](https://img.shields.io/circleci/project/egoist/minimost/master.svg?style=flat)](https://circleci.com/gh/egoist/minimost) [![codecov](https://codecov.io/gh/egoist/minimost/branch/master/graph/badge.svg)](https://codecov.io/gh/egoist/minimost)
 [![donate](https://img.shields.io/badge/$-donate-ff69b4.svg?maxAge=2592000&style=flat)](https://github.com/egoist/donate)

## Features

- Flags in kebab-case are converted to camelCase, eg: `--foo-bar foo` results in `{ fooBar: 'foo' }`
- Preserve arguments after `--`, eg: `-- npm test` results in `{ '--': ['npm', 'test'] }`
- Separate flags and input, eg: `./bin foo -w` results in `{ input: ['foo'], flags: { w: true } }`

## Why not use meow?

This is similar to [meow](https://github.com/substack/minimist), but I sometime just want to parse argv without being a real CLI app.

## Install

```bash
yarn add minimost
```

## Usage

```js
const minimost = require('minimost')

minimost(process.argv.slice(2), options)
```

## API

### minimost(argv, options)

#### options

[minimist](https://github.com/substack/minimist) options, `options['--']` is `true` by default here.

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D


## Author

**minimost** © [egoist](https://github.com/egoist), Released under the [MIT](./LICENSE) License.<br>
Authored and maintained by egoist with help from contributors ([list](https://github.com/egoist/minimost/contributors)).

> [egoist.moe](https://egoist.moe) · GitHub [@egoist](https://github.com/egoist) · Twitter [@_egoistlily](https://twitter.com/_egoistlily)
