/* eslint-disable */
window.onerror = function (message, url, lineNo, colNo, error) {
  console.log(arguments)
  let container = document.createElement('div')
  container.style.color = 'red'
  container.style.position = 'fixed'
  container.style.background = '#eee'
  container.style.padding = '2em'
  container.style.top = '1em'
  container.style.left = '1em'
  let msg = document.createElement('pre')
  msg.innerText = [
    'Message: ' + message,
    'URL: ' + url,
    'Line: ' + lineNo,
    'Column: ' + colNo,
    'Stack: ' + (error && error.stack)
  ].join('\n')
  container.appendChild(msg)
  document.body.appendChild(container)
}

import Vue from 'vue'
import Raven from 'raven-js'
import RavenVue from 'raven-js/plugins/vue'
import I18n from 'vue-i18n'
import Cookie from 'vue-cookie'
import Analytics from 'vue-analytics'
import Paginate from 'vue-paginate'
import InfiniteScroll from 'vue-infinite-scroll'
import { sync } from 'vuex-router-sync'
import { version } from '../package'
import App from './App'
import router from './router'
import store from './store'
import en from 'locales/en'
import ja from 'locales/ja'
import nl from 'locales/nl'

const locales = {
  en: en,
  ja: ja,
  nl: nl
}

if (process.env.NODE_ENV === 'production') {
  // Raven error tracking
  Raven.config('https://d4a1fd4efa3442e598a874b92c24e11a@sentry.io/164720', {
    release: version
  }).addPlugin(RavenVue, Vue).install()

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
Vue.use(InfiniteScroll)

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
