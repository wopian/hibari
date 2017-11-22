import Vue from 'vue'
import I18n from 'vue-i18n'
import store from '../store'

Vue.use(I18n)

let locale = store.state.preferences.language

const messages = {
  en: () => import('./en' /* webpackChunkName: 'locale-en' */),
  ja: () => import('./ja' /* webpackChunkName: 'locale-ja' */),
  nl: () => import('./nl' /* webpackChunkName: 'locale-nl' */)
}

export default new I18n({
  locale,
  fallbackLocale: 'en',
  messages
})
