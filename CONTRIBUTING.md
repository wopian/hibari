# Contributing

For beginners, [Visual Studio Code](https://code.visualstudio.com) is highly recommended with its
git integration, integrated terminal (<kbd>ctrl</kbd> <kbd>'</kbd>) and
[ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) plugin for
ensuring your code conforms to Standard JS

## Code Standard

[Standard JS](http://standardjs.com/rules.html#javascript-standard-style) is followed for
JavaScript. The general rules are:
- 2 spaces for indentation
- Single quotes for strings
- No unused variables
- No semicolons
- Space after keywords (`if (condition) { ... }`)
- Space after function names (`function name (arg) { ... }`)
- Always use `===` instead of `==`

## Commit Messages

[Karma](https://karma-runner.github.io/1.0/dev/git-commit-msg.html)'s semantic commit message format
is used in this repository

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
