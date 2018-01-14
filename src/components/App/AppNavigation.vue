<template lang='pug'>
nav.navbar(v-bind:class='{ "is-active": burgerActive, "is-sticky": stickyActive }')
  .container
    .navbar-brand
      router-link.navbar-item(
        to='/'
        @click.native='closeBurger()') {{ $t('hibari') }}

      button.button.navbar-burger(
        @click='toggleBurger()'
        v-bind:class='{ "is-active": burgerActive }')
        span
        span
        span

    .navbar-menu(v-bind:class='{ "is-active": burgerActive }')
      .navbar-start
        router-link.navbar-item(
          v-if='$store.state.auth.my && $store.state.auth.my.name'
          :to='{ name: "anime library", params: { slug: $store.state.auth.my.slug, status: "all" }}'
          active-class='has-text-primary'
          @click.native='closeBurger()') {{ $t('navigation.library') }}
        router-link.navbar-item(
          :to='{ name: "explore anime" }'
          active-class='has-text-primary'
          @click.native='closeBurger()') {{ $t('navigation.anime') }}
        router-link.navbar-item(
          :to='{ name: "explore manga" }'
          active-class='has-text-primary'
          @click.native='closeBurger()') {{ $t('navigation.manga') }}
        router-link.navbar-item(
          :to='{ name: "bugs" }'
          active-class='has-text-primary'
          @click.native='closeBurger()') {{ $t('navigation.bugs') }}

      .navbar-end(v-if='$store.getters.isAuth && $store.state.auth.my')
        nav-logged-in
      .navbar-end(v-else)
        nav-language
        nav-search
        nav-login
</template>

<script>
  export default {
    name: 'navigation',
    components: {
      navLoggedIn: () => import('=/Nav/NavLoggedIn'),
      navLogin: () => import('=/Nav/NavLogin'),
      navLanguage: () => import('=/Nav/NavLanguage'),
      navSearch: () => import('=/Nav/NavSearch')
    },
    data () {
      return {
        burgerActive: false,
        stickyActive: false
      }
    },
    methods: {
      async toggleBurger () {
        this.burgerActive = !this.burgerActive
      },
      async closeBurger () {
        this.burgerActive = false
      },
      async checkStickyness () {
        this.stickyActive = (window.pageYOffset || document.documentElement.scrollTop) > 1
      }
    },
    mounted () {
      window.addEventListener('scroll', () => this.checkStickyness(), { passive: true })
    }
  }
</script>

<style lang='sass' scoped>
  nav
    background: transparent
    position: fixed
    top: 0
    width: 100vw
    z-index: 9999
    transition: background .1s ease-in
    a.navbar-item
      color: var(--colour-whiteSmoke)
      background: transparent
      transition: color .2s cubic-bezier(0,0,0.3,1)
      &:hover
        color: var(--colour-cinnabar)
    &.is-sticky
      background: var(--colour-haiti)
      transition: background .2s ease-out

  .navbar-brand a
    font-weight: 700

  .is-active .navbar-menu, .is-active .navbar-brand
    background: var(--colour-haiti)

  .navbar-burger
    background: transparent
    color: var(--colour-whiteSmoke)
    border: 0
</style>
