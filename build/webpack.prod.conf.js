const { join, resolve } = require('path')
const { sync } = require('glob-all')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const { name } = require('../package')
const merge = require('webpack-merge')
const chalk = require('chalk')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const BundleSizePlugin = require('webpack-bundle-size-analyzer').WebpackBundleSizeAnalyzerPlugin
const ServiceWorkerPlugin = require('sw-precache-webpack-plugin')
const PurgeCSS = require('purgecss-webpack-plugin')

const env = config.build.env
const webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  devtool: config.build.productionSourceMap ? 'nosources-source-map' : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[name].[chunkhash].js')
  },
  plugins: [
    new ProgressBarPlugin({
      format: '  ' + chalk.green.bold(':percent') + ' :elapseds :msg',
      renderThrottle: 10
    }),
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new UglifyJsPlugin({
      parallel: true,
      cache: true
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css')
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        autoprefixer: true,
        rawCache: true,
        calc: true,
        colormin: true,
        convertValues: true,
        discardComments: true,
        discardDuplicates: true,
        discardEmpty: true,
        discardOverridden: true,
        discardUnused: true, // May be unsafe
        mergeIdents: true,
        mergeLonghand: true,
        mergeRules: true,
        minifyFontValues: true,
        minifyGradients: true,
        minifyParams: true,
        minifySelectors: true,
        normalizeCharset: true,
        normalizeDisplayValues: true,
        normalizePositions: true,
        normalizeRepeatStyle: true,
        normalizeString: {
          preferredQuote: 'single'
        },
        normalizeTimingFunctions: true,
        normalizeUnicode: true,
        normalizeUrl: true,
        normalizeWhitespace: true,
        orderedValues: true,
        reduceIdents: true, // May be unsafe
        reduceInitial: true,
        reduceTransforms: true,
        svgo: true,
        uniqueSelectors: true,
        zindex: true // May be unsafe
      }
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: 'src/index.pug',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency',
      production: (process.env.NODE_ENV === 'production'),
      serviceWorker: 'sw.js'
    }),
    // https://www.purgecss.com/whitelisting.html
    // new PurgeCSS({
    //   paths: sync(join(__dirname, '../src/**/*.{js,vue,pug}'))
    // }),
    // keep module.id stable when vender modules does not change
    new webpack.HashedModuleIdsPlugin(),
    /*
    new webpack.optimize.CommonsChunkPlugin({
      children: true,
      async: 'common',
      minChunks: 1
    }),
    */
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: (module, count) => {
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),
    new CopyWebpackPlugin([
      {
        from: resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ]),
    new BundleSizePlugin('../.bundlesize.yml'),
    new ServiceWorkerPlugin({
      cacheId: name,
      filename: 'sw.js',
      staticFileGlobs: [
        'dist/**/*.{css,html,js}'
      ],
      minify: true,
      mergeStaticsConfig: false,
      stripPrefix: 'dist/'
      /*
      runtimeCaching: [
        {
          urlPattern: /\/anime\//,
          handler: 'fastest',
          options: {
            cache: {
              maxEntries: 10,
              name: 'anime-cache'
            }
          }
        }
      ]
      */
    })
  ]
})

module.exports = webpackConfig
