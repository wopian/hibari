import Vue from 'vue'
import router from './router'
import store from './store'
import App from './App'

Vue.config.productionTip = false

router.afterEach(to => {
  store.commit('ROUTE_CHANGED', { to })
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
