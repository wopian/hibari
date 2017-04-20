var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
var UglifyJSPlugin = require('uglifyjs-webpack-plugin')
var OfflinePlugin = require('offline-plugin')
var GitRevisionPlugin = require('git-revision-webpack-plugin')
var gitRevisionPlugin = new GitRevisionPlugin({
  versionCommand: 'describe --tags --always'
})
var env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : config.build.env

var webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env,
      'VERSION': JSON.stringify(gitRevisionPlugin.version()),
    }),
    // UglifyJS2 doesn't support ES6 still
    // https://github.com/mishoo/UglifyJS2/issues/448
    /*
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: false
    }),
    */
    // Workaround for above
    // Remove uglify-js and uglifyjs-webpack-plugin when resolved
    new UglifyJSPlugin({
      compress: {
        warnings: false
      },
      comments: false,
      sourceMap: false,
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css')
    }),
    // Optimize css
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: {
        calc: true,
        colormin: true,
        convertValues: true,
        core: true,
        discardComments: { removeAll: true },
        discardDuplicates: true,
        discardEmpty: true,
        discardOverridden: true,
        discardUnused: false, // unsafe
        filterOptimiser: true,
        functionOptimiser: true,
        mergeIdents: true, // unsafe
        mergeLonghand: true,
        mergeRules: true,
        minifyFontValues: true,
        minifyGradients: true,
        minifyParams: true,
        minifySelectors: true,
        normalizeCharset: true,
        normalizeString: { preferredQuote: 'single' },
        normalizeUnicode: true,
        normalizeUrl: true,
        orderedValues: true,
        reduceBackgroundRepeat: true,
        reduceDisplayValues: true,
        reduceIdents: false, // unsafe
        reduceInitial: true,
        reducePositions: true,
        reduceTimingFunctions: true,
        reduceTransforms: true,
        svgo: true,
        uniqueSelectors: true,
        zindex: true // unsafe
        // options: cssnano.co/optimisations
      },
      canPrint: true
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: process.env.NODE_ENV === 'testing'
        ? 'index.html'
        : config.build.index,
      template: 'client/index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        minifyCSS: true,
        minifyJS: true,
        minifyURLS: true,
        sortAttributes: true,
        sortClassName: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
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
    // progressive web app
    // uses publicPath in webpack config
    new OfflinePlugin({
      caches: 'all',
      responseStrategy: 'network-first',
      updateStrategy: 'changed',
      relativePaths: false,
      // autoUpdate: true // Update every hour. 1000 * 60 * 60 * 5 = 5hrs
      ServiceWorker: {
        events: true
      },
      AppCache: false
    })
  ]
})

if (config.build.productionGzip) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
