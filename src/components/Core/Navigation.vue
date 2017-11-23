<template lang='pug'>
nav.navbar
  .container
    .navbar-brand
      router-link.navbar-item(to='/') Hibari

      button.button.navbar-burger(
        @click='toggleMenu()'
        v-bind:class='{ "is-active": menuActive }')
        span
        span
        span

    .navbar-menu(v-bind:class='{ "is-active": menuActive }')
      .navbar-start
        router-link.navbar-item(
          v-if='$store.state.me && $store.state.me.name'
          :to='{ name: "Anime Library", params: { slug: $store.state.me.name, status: "all" }}'
          active-class='has-text-primary') Library
        router-link.navbar-item(
          :to='{ name: "Explore Anime" }'
          active-class='has-text-primary') Anime
        router-link.navbar-item(
          :to='{ name: "Explore Manga" }'
          active-class='has-text-primary') Manga
        router-link.navbar-item(
          :to='{ name: "Bugs" }'
          active-class='has-text-primary') Bugs & Features

      .navbar-end
        loggedIn(v-if='$store.getters.isAuth && $store.state.me')
        login(v-else)
</template>

<script>
  export default {
    name: 'navigation',
    components: {
      loggedIn: () => import('=/Menu/LoggedIn' /* webpackChunkName: 'menu-loggedin' */),
      login: () => import('=/Menu/Login' /* webpackChunkName: 'menu-login' */)
    },
    data () {
      return {
        menuActive: false
      }
    },
    methods: {
      async toggleMenu () {
        this.menuActive = !this.menuActive
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
      backdrop-filter: blur(1rem)

  .navbar-brand a
    font-weight: 700

  .navbar-menu
    background: transparent

  .navbar-burger
    background: transparent
    border: 0
</style>
