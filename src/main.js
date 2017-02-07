import Vue from 'vue'
import VueI18n from 'vue-i18n'
import App from './App.vue'

// Define translated locales
var locales = {
  en: {
    message: {
      hello: 'hello world'
    }
  },
  ja: {
    message: {
      hello: 'こんにちは、世界'
    }
  }
}

Vue.use(VueI18n)

// Set Language
Vue.config.lang = 'en'

// Set Locales
Object.keys(locales).forEach((lang) => {
  Vue.locale(lang, locales[lang])
})

new Vue({
  el: '#app',
  render: h => h(App)
})
