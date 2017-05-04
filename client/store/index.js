import Vue from 'vue'
import Vuex from 'vuex'
import createPersist from 'vuex-localstorage'

Vue.use(Vuex)

const defaults = {
  user: {
    profile: {},
    library: {
      anime: [],
      manga: []
    },
    updated: null
  },
  media: {
    media: {},
    updated: null
  }
}

const state = {
  user: {},
  anime: {},
  manga: {}
}

const mutations = {
  PROFILE (state, payload) {
    // Create child objects if don't exist
    if (!state.user[payload.slug]) {
      state.user[payload.slug] = defaults.user
    }

    // Update store
    state.user[payload.slug].profile = payload.data.profile
    state.user[payload.slug].updated = payload.data.updated
  },
  LIBRARY (state, payload) {
    if (!state.user[payload.slug]) {
      state.user[payload.slug] = defaults.user
    } else if (!state.user[payload.slug].library) {
      // If it's an old session state
      state.user[payload.slug].library = defaults.user.library
    }

    // Update store
    state.user[payload.slug].library[payload.kind] = state.user[payload.slug].library[payload.kind].concat(payload.data)
  },
  ANIME (state, payload) {
    // Create child objects if don't exist
    if (!state.anime[payload.slug]) {
      state.anime[payload.slug] = defaults.media
    }

    // Update store
    state.anime[payload.slug].media = payload.data.anime
    state.anime[payload.slug].updated = payload.data.updated
  },
  MANGA (state, payload) {
    // Create child objects if don't exist
    if (!state.manga[payload.slug]) {
      state.manga[payload.slug] = defaults.media
    }

    // Update store
    state.manga[payload.slug].media = payload.data.manga
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
