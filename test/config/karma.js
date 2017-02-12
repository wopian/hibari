const webpackConfig = require('../../build/webpack.dev')
delete webpackConfig.entry

module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS'],
    frameworks: ['jasmine'],
    reporters: ['spec', 'coverage'],
    files: ['../index.js'],
    preprocessors: {
      '../index.js': ['webpack']
    },
    specReporter: {
      suppressSkipped: true
    },
    coverageReporter: {
      dir: '../coverage',
      reporters: [
        { type: 'lcov', subdir: '.' },
        { type: 'text-summary' }
      ]
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    },
    singleRun: true
  })
}
