// Polyfill fn.bind() for PhantomJS
/* eslint-disable no-extend-native */
Function.prototype.bind = require('function-bind')

// //webpack.github.io/docs/context.html#require-context
const testsContext = require.context('./specs', true, /\.spec$/)
testsContext.keys().forEach(testsContext)

const srcContext = require.context('../client', true, /^\.\/(?!app(\.js$)|styles(\.scss$)?)/)
srcContext.keys().forEach(srcContext)
console.log(srcContext.keys())
