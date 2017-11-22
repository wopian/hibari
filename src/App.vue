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
  @import ~mdi/css/materialdesignicons.min.css
</style>
