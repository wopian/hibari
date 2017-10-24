<template lang='pug'>
nav.navbar.navbar-dark.bg-secondary.sticky-top
  .container
    router-link.navbar-brand(to='/') Hibari
    .navbar-nav.mr-auto
      router-link.nav-item.nav-link(v-if='$store.state.me' :to='{ name: "Anime Library", params: { slug: $store.state.me.name, status: "all" }}') Library
      router-link.nav-item.nav-link(:to='{ name: "Explore Anime" }' active-class='active') Anime
      router-link.nav-item.nav-link(:to='{ name: "Explore Manga" }' active-class='active') Manga

    .navbar-nav
      .nav-item.dropdown(
        v-if='$store.getters.isAuth'
        v-bind:class='{ show: showDropdown.user }'
        @click='toggleDropdown("user")'
      )
        a.nav-link.dropdown-toggle(v-if='$store.state.me') {{ $store.state.me.name }}
        .dropdown-menu(
          v-bind:class='{ show: showDropdown.user }'
        )
          router-link.dropdown-item(v-if='$store.state.me' :to='{ name: "Profile", params: { slug: $store.state.me.name }}') Profile
          router-link.dropdown-item(v-if='$store.state.me' :to='{ name: "Preferences" }') Preferences
          .dropdown-divider
          a.dropdown-item(@click='$store.commit("LOGOUT")' href='') Logout
      .nav-item.dropdown(
        v-else
        v-bind:class='{ show: showDropdown.login }'
      )
        a.nav-link(@click='toggleDropdown("login")') Login
        .dropdown-menu.dropdown-login(
          v-bind:class='{ show: showDropdown.login }'
        )
          .form-group
            input.form-control(
              type='text'
              placeholder='Username'
              v-model='credentials.username'
            )
          .form-group
            input.form-control(
              type='password'
              placeholder='Password'
              v-model='credentials.password'
            )
          button.btn.btn-block.btn-primary(@click='submit()') Login with Kitsu
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
        },
        showDropdown: {
          user: false,
          login: false
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
      },

      toggleDropdown (dropdown) {
        this.showDropdown[dropdown] = !this.showDropdown[dropdown]
      }
    }
  }
</script>

<style lang='sass' scoped>

  nav
    flex-direction: row
    flex-wrap: nowrap
    justify-content: flex-start
    .container
      justify-content: flex-start
    .navbar-nav
      flex-direction: row
    .nav-link
      padding: .5rem

  .dropdown-menu
    position: absolute

  .dropdown-login
    padding: .5rem
    .form-group
      margin-bottom: .5rem
</style>
