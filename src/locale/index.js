import Vue from 'vue'
import I18n from 'vue-i18n'
import store from '../store'
import en from './en'
import ja from './ja'

Vue.use(I18n)

const locale = store.state.preferences.language || 'en'

const messages = {
  en,
  ja
}

export default new I18n({
  locale,
  messages
})
