import Vue from 'vue'
import Vuex from 'vuex'
import createPersist from 'vuex-localstorage'

Vue.use(Vuex)

const state = {
  user: {
    /*
    'wopian': {
      user: {},
      updated: null
    }
    */
  },
  anime: {
    /*
    'slug': {
      anime: {},
      updated: null
    }
    */
  },
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
    // Create child objects if don't exist
    if (!state.anime[payload.slug]) {
      state.anime[payload.slug] = { anime: {}, updated: null }
    }

    // Update store
    state.anime[payload.slug].anime = payload.data.anime
    state.anime[payload.slug].updated = payload.data.updated
  },
  MANGA (state, payload) {
    // Create child objects if don't exist
    if (!state.manga[payload.slug]) {
      state.manga[payload.slug] = { manga: {}, updated: null }
    }

    // Update store
    state.manga[payload.slug].manga = payload.data.manga
    state.manga[payload.slug].updated = payload.data.updated
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
