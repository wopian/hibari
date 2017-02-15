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
    background: rgba($primary, .9)
    transition: background 300ms ease-out
    backdrop-filter: blur(2px)
    border-bottom: 1px solid rgba(black, .05)
    overflow-y: hidden

    &:hover
      // background: white
      // background: $primary
      // transition: background 200ms ease-in

    nav
      @extend .nav
      @extend .container
      flex-align: flex-start

    h1
      @extend .navbar-brand
      @extend .mb-0
      padding-left: 15px
      color: white

      &:hover
        color: white

    a
      @extend .nav-link
      transition: color 200ms ease-out
      color: rgba(white, .7)

      &:hover
        color: white
        transition: color 100ms ease-in
</style>
