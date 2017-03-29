const templateRegex = /<template>([\s\S]*)<\/template>/gm
const scriptRegex = /<script>([\s\S]*)<\/script>/gm
const babelJest = require('babel-jest')

module.exports = {
  process (src, filepath, config, transformOptions) {
    templateRegex.lastIndex = scriptRegex.lastIndex = 0

    const template = templateRegex.exec(src)[1]
    return `${
      babelJest.process(
        scriptRegex.exec(src)[1],
        filepath + '.js', // Adding a fake .js extension to activate babel-jest.
        config,
        transformOptions
      )
    };
    exports.default['template']=\`${template}\`;
    `
  }
}
