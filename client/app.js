import Vue from 'vue'
import I18n from 'vue-i18n'
import { sync } from 'vuex-router-sync'
import Cookie from 'vue-cookie'
import App from './components/App'
import router from './router'
import store from './store'
import en from './locales/en'
import ja from './locales/ja'
sync(store, router)

console.log(en)

// https://kazupon.github.io/vue-i18n/
const locales = {
  en: en,
  ja: ja
}

// Use vue-cookie
Vue.use(Cookie)

// Use vue-i18n
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

const app = new Vue({
  router,
  store,
  ...App
})

export { app, router, store }
