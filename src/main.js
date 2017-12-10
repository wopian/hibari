import Vue from 'vue'
import Meta from 'vue-meta'
import Bulma from 'buefy'
import { i18n } from '@/plugins/i18n'
import router from '@/router'
import store from '@/store'
import App from '@/App'

Vue.config.productionTip = false
Vue.use(Meta, {
  keyName: 'meta',
  attribute: 'vue'
})
Vue.component(Bulma.Dropdown.name, Bulma.Dropdown)
Vue.component(Bulma.DropdownItem.name, Bulma.DropdownItem)
Vue.component(Bulma.Tooltip.name, Bulma.Tooltip)
Vue.component(Bulma.Input.name, Bulma.Input)
Vue.component(Bulma.Field.name, Bulma.Field)

router.afterEach(to => {
  store.commit('ROUTE_CHANGED', { to })
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  store,
  render: h => h(App)
})
