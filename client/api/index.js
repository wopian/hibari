import axios from 'axios'

export const Kitsu = axios.create({
  baseURL: 'https://kitsu.io/api/edge/',
  headers: {
    'Content-Type': 'application/vnd.api+json',
    'Accept': 'application/vnd.api+json'
    // 'User-Agent': 'hibari'
  }
})
