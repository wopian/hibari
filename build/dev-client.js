/* eslint-disable */
require('eventsource-polyfill')
const { subscribe } = require('webpack-hot-middleware/client?noInfo=true&reload=true')

subscribe(({ action }) => {
  if (action === 'reload') {
    window.location.reload()
  }
})
