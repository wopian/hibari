import OAuth2 from 'client-oauth2'

const { owner } = new OAuth2({
  clientId: '',
  clientSecret: '',
  accessTokenUri: 'https://kitsu.io/api/oauth/token'
})

export default {
  authenticated: false,

  async login (context, { username, password }, redirect) {
    let { accessToken } = await owner.getToken(username, password)

    localStorage.setItem('token', accessToken)

    this.authenticated = true
  },

  logout () {
    localStorage.removeItem('token')
    this.authenticated = false
  },

  checkAuth () {
    const token = localStorage.getItem('token')

    if (token) this.authenticated = true
    else this.authenticated = false

    return this.authenticated
  },

  getAuthHeader () {
    return {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  }
}
