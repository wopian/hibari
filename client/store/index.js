import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  user: {
    user: null,
    waifu: null,
    pinned: null,
    profileLinks: null,
    favourites: null
  }
}

const mutations = {
  USER (state, payload) {
    state.user.user = payload
  },
  WAIFU (state, payload) {
    state.user.waifu = payload
  },
  PINNED (state, payload) {
    state.user.pinned = payload
  },
  PROFILELINKS (state, payload) {
    state.user.profileLinks = payload
  },
  FAVOURITES (state, payload) {
    state.user.favourites = payload
  }
}

const actions = {
  /*
  incrementAsync ({ commit }) {
    setTimeout(() => {
      commit('INCREMENT')
    }, 200)
  }
  */
}

const store = new Vuex.Store({
  // user,
  // waifu,
  // pinned,
  // profileLinks,
  // favourites,
  state,
  mutations,
  actions
})

export default store
