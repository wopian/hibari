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

const locales = {
  en: en,
  ja: ja
}

if (process.env.NODE_ENV === 'production') {
  // Enable Progressive Web App
  require('./pwa')
  // Enable Google Analytics
  const id = 'UA-46184267-8'
  Vue.use(Analytics, {id, router})
}

sync(store, router)
Vue.use(Cookie)
Vue.use(I18n)
Vue.use(Paginate)

// Scroll to top of page on route change
router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0)
  next()
})

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
