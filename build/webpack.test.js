'use strict'
process.env.NODE_ENV = 'testing'

const path = require('path')
const base = require('./webpack.dev')

base.module.loaders.push(
  {
    test: /\.js$/,
    include: [
      path.resolve('../client/components'),
      path.resolve('../client/views')
    ],
    loader: 'isparta'
  }
)

module.exports = base
