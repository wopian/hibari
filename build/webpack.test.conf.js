// This is the webpack config used for unit tests.
var utils = require('./utils')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseConfig = require('./webpack.base.conf')
var GitRevisionPlugin = require('git-revision-webpack-plugin')
var gitRevisionPlugin = new GitRevisionPlugin({
  versionCommand: 'describe --tags --always'
})

var webpackConfig = merge(baseConfig, {
  // use inline sourcemap for karma-sourcemap-loader
  module: {
    rules: utils.styleLoaders()
  },
  devtool: '#inline-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/test.env'),
      'VERSION': JSON.stringify(gitRevisionPlugin.version())
    })
  ]
})

// no need for app entry during tests
delete webpackConfig.entry

module.exports = webpackConfig
