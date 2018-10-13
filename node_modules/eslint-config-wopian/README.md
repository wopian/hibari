# ESLint Config

[![npm badge]][npm]
[![npm install badge]][npm]
[![contributors badge]][contributors]
[![donate badge]][donate]

[![travis badge]][travis]
[![david badge]][david]
[![david dev badge]][david dev]

Standard ESLint Config for my projects

Also available for [Vue] and [React]

[Vue]:https://www.npmjs.com/package/eslint-config-wopian-vue
[React]:https://www.npmjs.com/package/eslint-config-wopian-react

## Requirements

- [ESLint] `>=4.0.0`
- Node `>=6.0.0`

## Installation

```shell
yarn add --dev eslint eslint-config-wopian
npm install --save-dev eslint eslint-config-wopian
```

## Usage

Create an `.eslintrc.*` file to configure rules. See: https://eslint.org/docs/user-guide/configuring

Example **.eslintrc.yml**

```yaml
extends: wopian
```

## Contributing

### Setup

This project uses Yarn Workspaces which has to be enabled globally:

```shell
yarn config set workspaces-experimental true
```

#### Install Dependencies

```shell
yarn
yarn bootstrap
```

## License

All code released under [MIT]

[eslint]: https://eslint.org

[mit]: https://github.com/wopian/eslint-config-wopian/blob/master/LICENSE.md

[npm]: https://www.npmjs.com/package/eslint-config-wopian
[npm badge]: https://img.shields.io/npm/v/eslint-config-wopian.svg?style=flat-square
[npm install badge]: https://img.shields.io/npm/dt/eslint-config-wopian.svg?style=flat-square

[travis]: https://travis-ci.org/wopian/eslint-config-wopian
[travis badge]: https://img.shields.io/travis/wopian/eslint-config-wopian/master.svg?style=flat-square&label=linux%20%26%20macOS

[david]: https://david-dm.org/wopian/eslint-config-wopian?path=packages/eslint-config-wopian
[david badge]: https://david-dm.org/wopian/eslint-config-wopian/status.svg?path=packages/eslint-config-wopian&style=flat-square
[david dev]: https://david-dm.org/wopian/eslint-config-wopian?type=dev
[david dev badge]: https://img.shields.io/david/dev/wopian/eslint-config-wopian.svg?style=flat-square

[contributors]: https://github.com/wopian/eslint-config-wopian/graphs/contributors
[contributors badge]: https://img.shields.io/github/contributors/wopian/eslint-config-wopian.svg?style=flat-square

[donate]: https://www.patreon.com/wopian
[donate badge]: https://img.shields.io/badge/patreon-donate-ff69b4.svg?style=flat-square
