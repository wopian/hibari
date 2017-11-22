import OAuth2 from 'client-oauth2'

export const { owner } = new OAuth2({
  clientId: '',
  clientSecret: '',
  accessTokenUri: 'https://kitsu.io/api/oauth/token'
})
