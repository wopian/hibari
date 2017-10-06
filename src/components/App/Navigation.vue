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
        v-if='authed'
        v-bind:class='{ show: showDropdown.user }'
        @click='toggleDropdown("user")'
      )
        a.nav-link.dropdown-toggle Wopian
        .dropdown-menu(
          v-bind:class='{ show: showDropdown.user }'
        )
          router-link.dropdown-item(:to='{ name: "Profile", params: { slug: "wopian" }}' ) Profile
          .dropdown-divider
          a.dropdown-item(@click='logout' href='') Logout
      router-link.nav-item.nav-link(:to='{ name: "Login" }' active-class='active' v-else) Login
</template>

<script>
  import auth from '@/api/auth'

  export default {
    name: 'navigation',
    data () {
      return {
        showDropdown: {
          user: false
        }
      }
    },
    computed: {
      authed: () => auth.checkAuth()
    },
    methods: {
      toggleDropdown (dropdown) {
        this.showDropdown[dropdown] = !this.showDropdown[dropdown]
      },
      logout () {
        auth.logout()
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
</style>
