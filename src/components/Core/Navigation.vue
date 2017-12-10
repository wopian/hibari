<template lang='pug'>
nav.navbar(v-bind:class='{ "is-active": menuActive }')
  .container
    .navbar-brand
      router-link.navbar-item(
        to='/'
        @click.native='close()') {{ $t('hibari') }}

      button.button.navbar-burger(
        @click='toggle()'
        v-bind:class='{ "is-active": menuActive }')
        span
        span
        span

    .navbar-menu(v-bind:class='{ "is-active": menuActive }')
      .navbar-start
        router-link.navbar-item(
          v-if='$store.state.auth.my && $store.state.auth.my.name'
          :to='{ name: "Anime Library", params: { slug: $store.state.auth.my.slug, status: "all" }}'
          active-class='has-text-primary'
          @click.native='close()') {{ $t('navigation.library') }}
        router-link.navbar-item(
          :to='{ name: "Explore Anime" }'
          active-class='has-text-primary'
          @click.native='close()') {{ $t('navigation.anime') }}
        router-link.navbar-item(
          :to='{ name: "Explore Manga" }'
          active-class='has-text-primary'
          @click.native='close()') {{ $t('navigation.manga') }}
        router-link.navbar-item(
          :to='{ name: "Bugs" }'
          active-class='has-text-primary'
          @click.native='close()') {{ $t('navigation.bugs') }}

      .navbar-end
        language
        loggedIn(v-if='$store.getters.isAuth && $store.state.auth.my')
        login(v-else)
</template>

<script>
  export default {
    name: 'navigation',
    components: {
      loggedIn: () => import('=/Menu/LoggedIn' /* webpackChunkName: 'menu-loggedin' */),
      login: () => import('=/Menu/Login' /* webpackChunkName: 'menu-login' */),
      language: () => import('=/Core/Language' /* webpackChunkName: 'core-language' */)
    },
    data () {
      return {
        menuActive: false
      }
    },
    methods: {
      async toggle () {
        this.menuActive = !this.menuActive
      },
      async close () {
        this.menuActive = false
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
