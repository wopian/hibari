const state = {
  name: null,
  path: null,
  hash: null,
  query: null,
  params: null,
  fullPath: null,
  meta: null
}

const mutations = {
  ROUTE_CHANGED (state, { to }) {
    state.name = to.name
    state.path = to.path
    state.hash = to.hash
    state.query = to.query
    state.params = to.params
    state.fullPath = to.fullPath
    state.meta = to.meta
  }
}

export default {
  state,
  mutations
}
