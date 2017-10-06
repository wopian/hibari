import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import router from './router'
import store from './store'
import App from './App'

Vue.config.productionTip = false

sync(store, router)

const app = new Vue({
  router,
  store,
  render: h => h(App)
})

document.addEventListener('DOMContentLoaded', () => {
  app.$mount('#app')
})
