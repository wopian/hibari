import Vue from 'vue'
import Vuex from 'vuex'
import PersistedState from 'vuex-persistedstate'
import api from '../api'

Vue.use(Vuex)

const state = {
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
  async LOGIN (state, payload) {
    api.headers['Authorization'] = `Bearer ${payload}`
    state.me = await api.self({
      fields: {
        users: 'avatar,name'
      }
    })
    state.token = payload
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
}

const store = new Vuex.Store({
  plugins: [PersistedState()],
  state,
  getters,
  mutations,
  actions
})

export default store
