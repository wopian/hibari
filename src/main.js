import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import router from './router'
import store from './store'
import App from './App'

Vue.config.productionTip = false

sync(store, router)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

/* TODO: Find why Netlify prerendering still doesn't work
document.addEventListener('DOMContentLoaded', () => {
  app.$mount('#app')
})
*/
