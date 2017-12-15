import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import localforage from 'localforage'
import auth from './modules/auth'
import landing from './modules/landing'
import preferences from './modules/preferences'
import route from './modules/route'

Vue.use(Vuex)

const persistSync = new VuexPersist({
  storage: window.localStorage,
  modules: [ 'auth', 'me', 'preferences' ]
})

const persistAsync = new VuexPersist({
  storage: localforage,
  asyncStorage: true,
  modules: [ 'landing', 'route' ]
})

const store = new Vuex.Store({
  plugins: [ persistSync.plugin, persistAsync.plugin ],
  modules: {
    auth,
    landing,
    preferences,
    route
  }
})

export default store
