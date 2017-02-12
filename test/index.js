// //webpack.github.io/docs/context.html#require-context
const testsContext = require.context('./spec', true, /\.js$/)
testsContext.keys().forEach(testsContext)
