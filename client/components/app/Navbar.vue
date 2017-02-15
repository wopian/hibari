<template lang='pug'>
  header
    nav
      h1 {{ $t('hibari') }}
        span(v-if='development')  Dev
      router-link(:to='{name: "Home"}') {{ $t('navigation.home') }}
      language-switcher
</template>

<script>
  import LanguageSwitcher from 'components/app/LanguageSwitcher'

  export default {
    components: {
      LanguageSwitcher
    },
    computed: {
      development () {
        return window.location.hostname === 'localhost'
      }
    }
  }
</script>

<style lang='sass'>
  @import ~bootstrap/scss/bootstrap
  @import ~assets/variables

  header
    @extend .navbar
    @extend .navbar-light
    @extend .fixed-top
    background: rgba(white, .9)
    transition: background 300ms ease-out
    backdrop-filter: blur(2px)
    border-bottom: 1px solid rgba(black, .05)
    overflow-y: hidden

    &:hover
      background: white
      transition: background 200ms ease-in

    nav
      @extend .nav
      @extend .container
      flex-align: flex-start

    h1
      @extend .navbar-brand
      @extend .mb-0
      padding-left: 15px

    a
      @extend .nav-link
      color: black
      transition: color 200ms ease-out

      &:hover
        color: $primary
        transition: color 100ms ease-in
</style>
