<template lang='pug'>
nav.navbar.navbar-dark.bg-secondary.sticky-top
  .container
    router-link.navbar-brand(to='/') Hibari
    .navbar-nav.mr-auto
      router-link.nav-item.nav-link(to='/anime' active-class='active') Anime
      router-link.nav-item.nav-link(to='/manga' active-class='active') Manga
      router-link.nav-item.nav-link(to='/drama' active-class='active') Drama

    .navbar-nav
      a.nav-item.dropdown(
        v-if='$store.getters.isAuth'
        v-bind:class='{ show: showDropdown.user }'
        @click='toggleDropdown("user")'
      )
        a.nav-link.dropdown-toggle Wopian
        .dropdown-menu(
          v-bind:class='{ show: showDropdown.user }'
        )
          router-link.dropdown-item(:to='{ name: "Profile", params: { slug: "wopian" }}' ) Profile
          .dropdown-divider
          a.dropdown-item(@click='$store.commit("REMOVE_TOKEN")' href='') Logout
      a.nav-item.dropdown(
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
          this.$store.commit('SET_TOKEN', accessToken)
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
