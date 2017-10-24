import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
// import localforage from 'localforage'
import api from '../api'
import landing from './modules/landing'
import preferences from './modules/preferences'
import route from './modules/route'

Vue.use(Vuex)

// https://github.com/championswimmer/vuex-persist/issues/3
// const db = localforage.createInstance({ name: 'vuex' })
const persist = new VuexPersist({
  storage: window.localStorage
})

const state = {
  token: null,
  me: null
}

const getters = {
  isAuth (state) {
    return state.token != null
  }
}

const mutations = {
  LOGIN (state, payload) {
    api.headers['Authorization'] = `Bearer ${payload}`
    state.token = payload
  },

  LOGIN_USERDATA (state, payload) {
    state.me = payload
  },

  LOGOUT (state) {
    api.headers['Authorization'] = undefined
    state.me = null
    state.token = null
  }
}

const actions = {
  async LOGIN (context, payload) {
    context.commit('LOGIN', payload)
    const data = await api.self({ fields: { users: 'avatar,name' } })
    delete data.type
    delete data.links
    delete data.avatar.meta
    context.commit('LOGIN_USERDATA', data)
  }
}

const store = new Vuex.Store({
  plugins: [ persist.plugin ],
  modules: {
    landing,
    preferences,
    route
  },
  state,
  getters,
  mutations,
  actions
})

export default store
