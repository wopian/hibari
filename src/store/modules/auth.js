import api from '@/api'

const state = {
  accessToken: null,
  refreshToken: null,
  createdAt: null,
  expiresIn: null,
  my: null
}

const getters = {
  isAuth (state) {
    return state.my !== null
  }
}

const mutations = {
  LOGIN (state, payload) {
    api.headers['Authorization'] = `Bearer ${payload.access_token}`
    state.accessToken = payload.access_token
    state.refreshToken = payload.refresh_token
    state.createdAt = payload.created_at
    state.expiresIn = payload.expires_in
  },

  LOGIN_USERDATA (state, payload) {
    state.my = payload
  },

  LOGOUT (state) {
    api.headers['Authorization'] = undefined
    for (let key in state) state[key] = null
  }
}

const actions = {
  async LOGIN (context, payload) {
    context.commit('LOGIN', payload)
    const data = await api.self({ fields: { users: 'avatar,name,slug' } })
    delete data.type
    delete data.links
    delete data.avatar.meta
    context.commit('LOGIN_USERDATA', data)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
