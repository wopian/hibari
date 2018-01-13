require('./check-versions')()

process.env.NODE_ENV = 'production'

const rm = require('rimraf')
const { join } = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const { build } = require('../config')
const webpackConfig = require('./webpack.prod.conf')

rm(join(build.assetsRoot, build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, (err, stats) => {
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false,
      assetsSort: 'size'
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }
  })
})
