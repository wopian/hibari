import Vue from 'vue'
import I18n from 'vue-i18n'
import { sync } from 'vuex-router-sync'
import Cookie from 'vue-cookie'
import router from 'router'
import store from 'store'
import en from 'locales/en'
import ja from 'locales/ja'

sync(store, router)
Vue.use(Cookie)
const locales = {
  en: en,
  ja: ja
}
Vue.use(I18n)
Vue.config.lang = Vue.cookie.get('lang') ? Vue.cookie.get('lang') : 'en'
Vue.config.fallbackLang = 'en'
Object.keys(locales).forEach(lang => {
  Vue.locale(lang, locales[lang])
})

export { Vue, I18n, sync, Cookie, router, store, en, ja, locales }
