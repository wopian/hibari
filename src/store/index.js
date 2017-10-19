import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
// import localforage from 'localforage'
import api from '../api'
import moduleRoute from './moduleRoute'

Vue.use(Vuex)

// https://github.com/championswimmer/vuex-persist/issues/3
// const db = localforage.createInstance({ name: 'vuex' })
const persist = new VuexPersist({
  storage: window.localStorage
})

const state = {
  route: null,
  token: null,
  me: null,
  welcome: {
    posterWall: null
  }
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
  },

  SET_POSTERWALL (state, payload) {
    state.welcome.posterWall = payload
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
    route: moduleRoute
  },
  state,
  getters,
  mutations,
  actions
})

export default store
