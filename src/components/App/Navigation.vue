<template lang='pug'>
nav.navbar
  .container
    .navbar-brand
      router-link.navbar-item(to='/') Hibari

    .navbar-menu
      .navbar-start
        router-link.navbar-item(v-if='$store.state.me && $store.state.me.name' :to='{ name: "Anime Library", params: { slug: $store.state.me.name, status: "all" }}') Library
        router-link.navbar-item(:to='{ name: "Explore Anime" }' active-class='active') Anime
        router-link.navbar-item(:to='{ name: "Explore Manga" }' active-class='active') Manga

      .navbar-end
        // User Menu Dropdown
        b-dropdown(
          v-if='$store.getters.isAuth && $store.state.me'
          position='is-bottom-left'
        )
          a.navbar-item(slot='trigger')
            span {{ $store.state.me.name }}
            b-icon(icon='menu-down')
          b-dropdown-item(has-link)
            router-link(:to='{ name: "Profile", params: { slug: $store.state.me.name } }') Profile
          hr.dropdown-divider
          b-dropdown-item(has-link)
            router-link(:to='{ name: "Preferences" }') Preferences
          b-dropdown-item(has-link)
            a(@click='$store.commit("LOGOUT")' href='') Logout

        // Login Dropdown
        b-dropdown(
          v-else
          position='is-bottom-left'
        )
          a.navbar-item(slot='trigger')
            span Login
            b-icon(icon='menu-down')
          b-dropdown-item(custom paddingless)
            form(
              action=''
              v-on:submit.prevent=''
            )
              .modal-card
                .modal-card-body
                  b-field(label='Email / Username')
                    b-input(
                      v-model='credentials.username'
                      type='text'
                      placeholder='Your Email or Username'
                      required
                    )
                  b-field(label='Password')
                    b-input(
                      v-model='credentials.password'
                      type='password'
                      placeholder='Your password'
                      required
                    )
                  button.button.is-primary.button-block(@click='submit()') Login with Kitsu
</template>

<script>
  import OAuth2 from 'client-oauth2'

  export default {
    name: 'navigation',
    data () {
      return {
        credentials: {
          username: '',
          password: ''
        }
      }
    },
    methods: {
      async submit () {
        if (!this.$store.getters.getAuth) {
          const { username, password } = this.credentials
          const { owner } = new OAuth2({
            clientId: '',
            clientSecret: '',
            accessTokenUri: 'https://kitsu.io/api/oauth/token'
          })
          let { accessToken } = await owner.getToken(username, password)
          this.$store.dispatch('LOGIN', accessToken)
        }
      }
    }
  }
</script>

<style lang='sass' scoped>
  nav
    z-index: 999
    top: 0
    position: sticky
    background: rgba(white, .4)
    &::before
      content: ''
      position: absolute
      top: 0
      left: 0
      right: 0
      bottom: 0
      backdrop-filter: blur(.5rem)

  .modal-card
    max-width: 300px

  .button-block
    width: 100%
</style>
