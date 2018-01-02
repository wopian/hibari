# Contributing

For beginners, [Visual Studio Code] is highly recommended, as it has
git heavily integrated, an integrated terminal (`ctrl`+`'`) and the
[ESLint] plugin to ensure your code conforms to Standard JS.

## Localisation

Localisation of Hibari into your language, or expanding existing
translations is greatly appreciated.

Locale files are located in `src/locales` and uses the [ISO 639-1]
standard for language codes. All changes for localisation can be
done on the GitHub website.

### New Languages

1. Copy the contents of `en/index.js` in `src/locales`
2. Create a [new file][1] inside `src/locales` using the [ISO 639-1] code as the directory name (e.g `ja/index.js` for Japanese)
3. Translate the English strings
4. Update the `SUPPORTED_LANGUAGES` array in `src/constants/index.js` to include the [ISO 639-1] code

### Existing Languages

1. Check `en/index.js` has the same lines of code as the locale you're updating
    1. Add missing translation strings if required
2. Translate the strings

### Committing Changes

1. Add a commit message, e.g `localise: add japanese`
2. Click `Propose new file`
3. Finally click `Create pull request`
4. Wait a couple of minutes and check your translations live with Netlify's deploy preview

## Code Standard

[Standard JS] is followed for all JavaScript code. The general rules
are:

- 2 spaces for indentation
- Single quotes for strings
- No semicolons
- No unused variables
- Always use `===` and `!==` instead of `==` and `!=`
- Space after keywords (`if (condition) { ... }`)
- Space after function names (`function name (prop) { ... }`)

## Commit Messages

[Karma]'s semantic commit message format is used in this repository:

```text
feat: implement user pages
^--^  ^------------------^
|     |
|     +-> Summary in present tense
|
+-------> Type: chore, docs, feat, fix, localise, refactor, style or test
```

| Type | Usage
| ---- | -----
| chore     | Build scripts, no production code change
| docs      | Changes to documentation
| feat      | New feature for user, not for build script
| fix       | Bug fix for user, not for build script
| localise  | Modifying localisation strings
| refactor  | Refactoring production code, e.g renaming variables
| style     | Formatting etc, no code change
| test      | Adding tests, refactoring tests, no production code change

[Visual Studio Code]:https://code.visualstudio.com
[ESLint]:https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
[ISO 639-1]:https://en.wikipedia.org/wiki/ISO_639
[Standard JS]:http://standardjs.com/rules.html#javascript-standard-style
[Karma]:https://karma-runner.github.io/0.10/dev/git-commit-msg.html

[1]:https://help.github.com/articles/creating-new-files
