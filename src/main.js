import Vue from 'vue'
import locale from './locale'
import router from './router'
import store from './store'
import App from './App'

Vue.config.productionTip = false

router.afterEach(to => {
  store.commit('ROUTE_CHANGED', { to })
})

/* eslint-disable no-new */
export const app = new Vue({
  el: '#app',
  locale,
  router,
  store,
  render: h => h(App)
})

window.vue = app
window.store = store
