import Vue from 'vue'
import I18n from 'vue-i18n'
import store from '../store'

Vue.use(I18n)

const locale = store.state.preferences.language || 'en'

const messages = {
  en: () => import(/* webpackChunkName: 'locale-en' */ './en'),
  ja: () => import(/* webpackChunkName: 'locale-ja' */ './ja'),
  nl: () => import(/* webpackChunkName: 'locale-nl' */ './nl')
}

export default new I18n({
  locale,
  messages
})
