<template lang='pug'>
  #app
    app-navigation
    router-view
    app-footer
</template>

<script>
  import AppNavigation from '=/App/AppNavigation'
  import AppFooter from '=/App/AppFooter'

  export default {
    name: 'app',
    components: {
      AppNavigation,
      AppFooter
    },
    meta: {
      titleTemplate: title => title ? `${title} | Hibari` : 'Hibari'
    }
  }
</script>

<style lang='sass'>
  @import styles/app
</style>

<style lang='sss' scoped>
  body
    background: var(--colour-whiteSmoke)

  .navbar-item:hover,
  .navbar-link:hover
    background: transparent !important

  // Prevent page content from touching border on mobile devices
  @media screen and (max-width: 1023px)
    main > .container
      padding: 0 1rem
</style>
