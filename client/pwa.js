import runtime from 'offline-plugin/runtime'

runtime.install({
  onUpdateReady () {
    console.log('Updating Web App')
    runtime.applyUpdate()
  },
  onUpdated () {
    console.log('Updated Web App')
    location.reload()
  }
})
