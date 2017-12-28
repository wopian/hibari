import I18n from 'vue-i18n'
import Vue from 'vue'
import { DEFAULT_LANGUAGE, FALLBACK_LANGUAGE, SUPPORTED_LANGUAGES } from '@/constants'
import en from '@/locale/en'
import store from '@/store'

Vue.use(I18n)

const userLocale = (navigator.language || navigator.userLanguage).substring(0, 2)
const locale = store.state.preferences.language || userLocale || DEFAULT_LANGUAGE

function getMessages (lang) {
  const messages = { en }
  if (SUPPORTED_LANGUAGES.includes(lang)) {
    import(`@/locale/${lang}`).then(msgs => {
      messages[lang] = msgs.default || msgs
    })
  }
  return messages
}

export const i18n = new I18n({
  locale,
  fallbackLocale: FALLBACK_LANGUAGE,
  messages: locale === 'en' ? { en } : getMessages(locale)
})
