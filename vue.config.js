const { resolve } = require('path')
const { HashedModuleIdsPlugin } = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const ProgressiveManifestPlugin = require('webpack-pwa-manifest')
const SWPrecachePlugin = require('sw-precache-webpack-plugin')

module.exports = {
  lintOnSave: true,
  configureWebpack: {
    plugins: [
      new HashedModuleIdsPlugin(),
      new ProgressiveManifestPlugin({
        name: 'Hibari',
        short_name: 'Hibari',
        description: 'TODO',
        start_url: '.',
        display: 'standalone',
        theme_color: '#fff',
        background_color: '#fff',
        crossorigin: 'anonymous',
        icons: [
          {
            src: resolve('public/favicon.png'),
            sizes: [ 16, 32, 96, 128, 192, 256, 512 ]
          }
        ],
        inject: true,
        fingerprints: false,
        ios: true
      }),
      new SWPrecachePlugin({
        cacheId: 'hibari',
        dontCacheBustUrlsMatching: /\.\w{8}\./,
        filename: 'service-worker.js',
        minify: true,
        navigateFallback: '/',
        staticFileGlobsIgnorePatterns: [
          /\.map$/,
          /asset-manifest\.json$/,
          /_headers$/,
          /_redirects$/
        ]
      })
    ],
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 0,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: ({ context }) => `vendor.${context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]}`
          }
        }
      },
      minimizer: [
        new TerserPlugin({
          parallel: true,
          cache: true,
          extractComments: () => {}
        })
      ]
    }
  }
}
