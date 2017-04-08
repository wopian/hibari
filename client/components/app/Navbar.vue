<template lang='pug'>
  header.navbar.fixed-top.navbar-light(v-bind:class='{ transparent: position }')
      nav.nav.container
        h1.navbar-brand.mb-0 {{ $t('hibari') }}
          span(v-if='development') Dev
        router-link.nav-link(:to='{ name: "Home" }') {{ $t('navigation.home') }}
        router-link.nav-link(:to='{ name: "Bugs" }') {{ $t('navigation.bugs') }}
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
    },
    data () {
      return {
        position: (this.$route.params.slug || this.$route.params.query) ? ((window.pageYOffset || document.documentElement.scrollTop) < 100) : false
      }
    },
    methods: {
      handleScroll (event) {
        if (this.$route.params.slug || this.$route.params.query) {
          this.position = (window.pageYOffset || document.documentElement.scrollTop) < 100
        }
      }
    },
    beforeDestroy: function () {
      window.removeEventListener('scroll', this.handleScroll)
    },
    mounted () {
      window.addEventListener('scroll', () => {
        setTimeout(this.handleScroll, 250)
      })
    }
  }
</script>

<style lang='sass' scoped>
  @import ~assets/variables

  header
    padding: calc(.4rem + 1px) 1rem
    background: $primary
    transition: background 400ms ease-out
    overflow-y: hidden
    &.transparent
      background: transparent
      transition: background 400ms ease-in-out
      &:hover
        background: rgba($primary, .95)
        transition: background 300ms ease-in-out

  nav
    flex-align: flex-start
    padding-right: 0

  .navbar-brand
    padding-left: 0
    color: $white
    font-weight: 700
    cursor: default
    &:hover
      color: $white
    span
      font-weight: 400

  a
    transition: color 200ms ease-out
    color: rgba($white, .7)
    &:hover
      color: $white
      transition: color 100ms ease-in
</style>
