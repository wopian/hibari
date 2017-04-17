import Vue from 'vue'
import Vuex from 'vuex'
import createPersist from 'vuex-localstorage'

Vue.use(Vuex)

const state = {
  user: {
    /*
    'wopian': {
      data: {},
      updated: null
    }
    */
  },
  anime: {},
  manga: {}
}

const mutations = {
  USER (state, payload) {
    // Create child objects if don't exist
    if (!state.user[payload.slug]) {
      state.user[payload.slug] = { user: {}, updated: null }
    }

    // Update store
    state.user[payload.slug].user = payload.data.user
    state.user[payload.slug].updated = payload.data.updated
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
  plugins: [createPersist({
    namespace: 'hibari',
    initialState: {},
    // ONE_WEEK
    expires: 7 * 24 * 60 * 60 * 1e3
  })],
  state,
  mutations,
  actions
})

export default store
