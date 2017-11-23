import Vue from 'vue'
import Meta from 'vue-meta'
import Bulma from 'buefy'
import locale from './locale'
import router from './router'
import store from './store'
import App from './App'

Vue.use(Meta, {
  keyName: 'meta',
  attribute: 'vue'
})

Vue.component(Bulma.Dropdown.name, Bulma.Dropdown)
Vue.component(Bulma.DropdownItem.name, Bulma.DropdownItem)
Vue.component(Bulma.Tooltip.name, Bulma.Tooltip)
Vue.component(Bulma.Input.name, Bulma.Input)
Vue.component(Bulma.Field.name, Bulma.Field)

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
