import Vue from 'vue'
import Vuex from 'vuex'

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
  SET_TOKEN (state, payload) {
    state.token = payload
    localStorage.setItem('token', payload)
  },

  REMOVE_TOKEN (state) {
    state.token = null
    localStorage.removeItem('token')
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
