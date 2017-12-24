const { resolve } = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: resolve(__dirname, '../dist/index.html'),
    assetsRoot: resolve(__dirname, '../dist'),
    assetsSubDirectory: '.',
    assetsPublicPath: '/',
    productionSourceMap: false,
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 8080,
    assetsSubDirectory: '.',
    assetsPublicPath: '/',
    proxyTable: {},
    cssSourceMap: false
  }
}
