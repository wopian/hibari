// //webpack.github.io/docs/context.html#require-context
const testsContext = require.context('./specs', true, /\.spec$/)
testsContext.keys().forEach(testsContext)

const srcContext = require.context('../client', true, /^\.\/.*\.vue$/)
srcContext.keys().forEach(srcContext)
