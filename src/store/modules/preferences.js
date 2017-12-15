import { i18n } from '@/plugins/i18n'

const state = {
  language: 'en',
  defaultLibrary: 'anime',
  defaultFeed: 'global',
  alwaysShowNSFW: false,
  alwaysShowSpoilers: false
}

const mutations = {
  SET_LANGUAGE (state, payload) {
    i18n.locale = payload
    state.language = payload
  }
}

export default {
  state,
  mutations
}
