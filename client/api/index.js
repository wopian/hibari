import JsonApi from 'devour-client'
// import axios from 'axios'

export const Kitsu = new JsonApi({
  apiUrl: 'https://kitsu.io/api/edge',
  logger: true
})

Kitsu.headers['X-Requested-With'] = 'Hibari (wopian)'
Kitsu.headers['X-Forwarded-Host'] = 'hb.wopian.me'
