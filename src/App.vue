<template lang='pug'>
  #app
    navigation
    router-view
    aFooter
</template>

<script>
  export default {
    name: 'app',
    components: {
      Navigation: () => import('=/Core/Navigation' /* webpackChunkName: 'core-navigation' */),
      AFooter: () => import('=/Core/Footer' /* webpackChunkName: 'core-footer' */)
    },
    meta: {
      titleTemplate: title => title ? `${title} | Hibari` : 'Hibari'
    }
  }
</script>

<style lang='sass'>
  @import styles/bulma

  .navbar-item:hover,
  .navbar-link:hover
    background: transparent !important

  // Prevent page content from touching border on mobile devices
  @media screen and (max-width: 1023px)
    main > .container
      padding: 0 1rem
</style>
