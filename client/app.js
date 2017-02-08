import Vue from 'vue'
import I18n from 'vue-i18n'
import { sync } from 'vuex-router-sync'
import App from './components/App'
import router from './router'
import store from './store'
sync(store, router)

// https://kazupon.github.io/vue-i18n/
const locales = {
  en: {
    lang: 'English',
    home: {
      userStats: 'User Stats',
      animeStats: 'Anime Stats',
      mangaStats: 'Manga Stats'
    }
  },
  ja: {
    lang: '日本語',
    home: {
      userStats: 'ユーザー統計',
      animeStats: 'アニメの統計情報',
      mangaStats: '漫画の統計'
    }
  }
}

Vue.use(I18n)
Vue.config.lang = 'en'
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
