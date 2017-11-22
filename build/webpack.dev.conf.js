const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const chalk = require('chalk')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackPluginExt = require('script-ext-html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const BundleSizePlugin = require('webpack-bundle-size-analyzer').WebpackBundleSizeAnalyzerPlugin
const ProgressiveManifest = require('webpack-pwa-manifest')

Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  module: { rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap }) },
  devtool: '#cheap-module-eval-source-map',
  output: {
    filename: utils.assetsPath('[name].js'),
    chunkFilename: utils.assetsPath('[name].js')
  },
  plugins: [
    new ProgressBarPlugin({
      format: '  ' + chalk.green.bold(':percent') + ' :elapseds :msg',
      renderThrottle: 10
    }),
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new HtmlWebpackPluginExt({
      defaultAttribute: 'async'
    }),
    new FriendlyErrorsPlugin(),
    new BundleSizePlugin('../.bundlesize.yml'),
    new ProgressiveManifest({
      name: 'Hibari for Kitsu.io',
      short_name: 'Hibari',
      description: 'Vue alternative for Kitsu.io users',
      start_url: '.',
      theme_color: '#f75239',
      background_color: '#fff',
      icons: [
        {
          src: path.resolve('static/icon.png'),
          sizes: [ 16, 32, 96, 128, 192, 256, 512 ]
        }
      ],
      inject: true,
      fingerprints: true,
      ios: true
    })
  ]
})
