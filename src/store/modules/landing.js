const state = {
  latest: null
}

const mutations = {
  SAVE_LANDING_LATEST (state, payload) {
    state.latest = payload
  }
}

export default {
  state,
  mutations
}
