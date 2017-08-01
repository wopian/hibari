var utils = require('./utils')
var config = require('../config')
var isProduction = process.env.NODE_ENV === 'production'

var AUTOPREFIXER_BROWSERS = [
  'Android >= 57',
  'Chrome >= 57',
  'Firefox >= 53',
  'Explorer >= 11',
  'iOS >= 10',
  'Opera >= 43',
  'Safari >= 10',
];

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: isProduction
      ? config.build.productionSourceMap
      : config.dev.cssSourceMap,
    extract: isProduction
  }),
  postcss: [
    require('autoprefixer')({ browsers: AUTOPREFIXER_BROWSERS })
  ]
}
