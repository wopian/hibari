import Vue from 'vue'
import App from './App'
import I18n from 'vue-i18n'
import Cookie from 'vue-cookie'
import Analytics from 'vue-analytics'
import Paginate from 'vue-paginate'
import { sync } from 'vuex-router-sync'
import router from './router'
import store from './store'
import en from 'locales/en'
import ja from 'locales/ja'

if (process.env.NODE_ENV === 'production') {
  // Enable Progressive Web App
  require('./pwa')
}

sync(store, router)

const id = 'UA-46184267-8'
Vue.use(Analytics, {id, router})
Vue.use(Cookie)
Vue.use(Paginate)

const messages = {
  en: en,
  ja: ja
}
const i18n = new I18n({
  // Check if language cookie set, if so use it. Fallback to English
  locale: Vue.cookie.get('lang') ? Vue.cookie.get('lang') : 'en',
  fallbackLocale: 'en',
  messages
})
Vue.use(I18n)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  store,
  render: h => h(App)
})
