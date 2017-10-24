const state = {
  posterWall: null
}

const mutations = {
  SET_POSTERWALL (state, payload) {
    state.posterWall = payload
  }
}

export default {
  state,
  mutations
}
