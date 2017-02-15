import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  user: {},
  waifu: {},
  pinned: {},
  profileLinks: {},
  favourites: {},
  anime: {},
  manga: {}
}

const mutations = {
  USER (state, payload) {
    state.user[payload[1]] = payload[0]
  },
  WAIFU (state, payload) {
    state.waifu[payload[1]] = payload[0]
  },
  PINNED (state, payload) {
    state.pinned[payload[1]] = payload[0]
  },
  PROFILELINKS (state, payload) {
    state.profileLinks[payload[1]] = payload[0]
  },
  FAVOURITES (state, payload) {
    state.favourites[payload[1]] = payload[0]
  },
  ANIME (state, payload) {
    state.anime[payload[1]] = payload[0]
  },
  MANGA (state, payload) {
    state.manga[payload[1]] = payload[0]
  }
}

const actions = {
}

const store = new Vuex.Store({
  state,
  mutations,
  actions
})

export default store
