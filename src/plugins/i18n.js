import I18n from 'vue-i18n'
import Vue from 'vue'
import { DEFAULT_LANGUAGE, FALLBACK_LANGUAGE } from '@/constants'
import en from '@/locale/en'
import store from '@/store'

Vue.use(I18n)
export const i18n = new I18n({
  locale: store.state.preferences.language || DEFAULT_LANGUAGE,
  fallbackLocale: FALLBACK_LANGUAGE,
  messages: { en }
})
