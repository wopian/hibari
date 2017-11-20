const { cssLoaders } = require('./utils')
const { build, dev } = require('../config')
const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  loaders: cssLoaders({
    sourceMap: isProduction
      ? build.productionSourceMap
      : dev.cssSourceMap,
    extract: isProduction
  }),
  transformToRequire: {
    video: 'src',
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
