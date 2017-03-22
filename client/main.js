import Vue from 'vue'
import App from './App'
import I18n from 'vue-i18n'
import Cookie from 'vue-cookie'
import Analytics from 'vue-analytics'
import { sync } from 'vuex-router-sync'
import router from './router'
import store from './store'
import en from 'locales/en'
import ja from 'locales/ja'

const locales = {
  en: en,
  ja: ja
}
const id = 'UA-46184267-8'

if (process.env.NODE_ENV === 'production') {
  // Enable Progressive Web App
  require('./pwa')
}

sync(store, router)

Vue.use(Analytics, {id, router})
Vue.use(Cookie)
Vue.use(I18n)

// Check if language cookie has been set
// If so, use it
// Else use English
Vue.config.lang = Vue.cookie.get('lang') ? Vue.cookie.get('lang') : 'en'

// Set fallback used for untranslated strings
Vue.config.fallbackLang = 'en'

Object.keys(locales).forEach(lang => {
  Vue.locale(lang, locales[lang])
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
