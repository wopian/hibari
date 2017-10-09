import Vue from 'vue'
import Vuex from 'vuex'
import api from '../api'

Vue.use(Vuex)

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
  async LOGIN (state, payload) {
    api.headers['Authorization'] = `Bearer ${payload}`
    state.token = payload
    if (localStorage.getItem('me')) state.me = JSON.parse(localStorage.getItem('me'))
    state.me = await api.self()
    localStorage.setItem('token', payload)
    localStorage.setItem('me', JSON.stringify(state.me))
  },

  LOGOUT (state) {
    api.headers['Authorization'] = undefined
    state.token = null
    state.me = null
    localStorage.removeItem('token')
    localStorage.removeItem('me')
  }
}

const actions = {
}

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

export default store
