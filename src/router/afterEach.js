import store from '@/store'

export const afterEach = to => {
  store.commit('ROUTE_CHANGED', { to })
}
