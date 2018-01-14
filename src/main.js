import Vue from 'vue'
import Meta from 'vue-meta'
import InstantSearch from 'vue-instantsearch'
import { Dropdown, DropdownItem } from 'buefy/src/components/dropdown'
import Tooltip from 'buefy/src/components/tooltip'
import Input from 'buefy/src/components/input'
import Field from 'buefy/src/components/field'
import { i18n } from '@/plugins/i18n'
import { router, afterEach } from '@/router'
import store from '@/store'
import App from '@/App'

Vue.config.productionTip = false
Vue.use(Meta, {
  keyName: 'meta',
  attribute: 'vue'
})
Vue.use(InstantSearch)
Vue.component(Dropdown.name, Dropdown)
Vue.component(DropdownItem.name, DropdownItem)
Vue.component(Tooltip.name, Tooltip)
Vue.component(Input.name, Input)
Vue.component(Field.name, Field)

router.afterEach(afterEach)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  store,
  render: h => h(App)
})
