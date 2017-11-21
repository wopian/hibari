import Vue from 'vue'
import Buefy from 'buefy'
import Meta from 'vue-meta'
import locale from './locale'
import router from './router'
import store from './store'
import App from './App'

Vue.use(Buefy)
Vue.use(Meta, {
  keyName: 'meta',
  attribute: 'vue'
})

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
