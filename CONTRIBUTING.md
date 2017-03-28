# Contributing

For beginners, [Visual Studio Code][1] is highly recommended with its git
integration, integrated terminal (<kbd>ctrl</kbd> <kbd>'</kbd>) and [ESLint][2]
plugin for ensuring your code conforms to Standard JS

## Localisation

Localisation of Hibari is greatly appreciated! Locale files are located at
[`client/locales`][3] and uses the [ISO 639-1][4] standard

### The Basics

1. Copy & rename the `en.js` English localisation using the ISO 639 code of the
new language, e.g `ja.js` for Japanese
1. Add your translations

### Going Further

I'm happy to do this step for you, which fully integrates the language into
Hibari. This step should become unnecessary with a newer version of `vue-i18n`.

1. In [`client/main.js`][5] add `import ja from locales/ja` below the other
locale imports (replace ja with the correct code)
1. Add `ja: ja` into the `locales` object just below them
1. In [`client/components/app/LanguageSwitcher.vue`][6] add your language code
to the languages array (search for `EN`)

## Code Standard

[Standard JS][7] is followed for JavaScript. The general rules are:

- 2 spaces for indentation
- Single quotes for strings
- No unused variables
- No semicolons
- Space after keywords (`if (condition) { ... }`)
- Space after function names (`function name (arg) { ... }`)
- Always use `===` instead of `==`

## Commit Messages

[Karma][8]'s semantic commit message format is used in this repository:

```text
feat: implement user pages
^--^  ^------------------^
|     |
|     +-> Summary in present tense
|
+-------> Type: chore, docs, feat, fix, localise, refactor, style, test
```

| Type      | Usage
| --------- | -----
| chore     | build scripts, no production code change
| docs      | changes to documentation
| feat      | new feature for user, not for build script
| fix       | bug fix for user, not for build script
| localise  | modifying localisation strings
| refactor  | refactoring production code, e.g renaming variables
| style     | formatting etc, no code change
| test      | adding missing tests, refactoring tests, no production code change

[1]:https://code.visualstudio.com
[2]:https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
[3]:https://github.com/wopian/hibari/tree/master/client/locales
[4]:https://en.wikipedia.org/wiki/ISO_639
[5]:https://github.com/wopian/hibari/tree/master/client/main.js
[6]:https://github.com/wopian/hibari/tree/master/client/components/LanguageSwitcher.vue
[7]:http://standardjs.com/rules.html#javascript-standard-style
[8]:https://karma-runner.github.io/1.0/dev/git-commit-msg.html
