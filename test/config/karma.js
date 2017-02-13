const webpackConfig = require('../../build/webpack.test')
delete webpackConfig.entry

module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS'],
    frameworks: ['jasmine-jquery', 'jasmine'],
    reporters: ['spec', 'coverage'],
    files: ['../index.js'],
    preprocessors: {
      '../index.js': ['webpack']
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    },
    specReporter: {
      suppressSkipped: true
    },
    coverageReporter: {
      dir: '../../coverage',
      reporters: [
        { type: 'lcov', subdir: '.' },
        { type: 'text-summary' }
      ]
    },
    singleRun: true
  })
}
