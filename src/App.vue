<template lang='pug'>
  #app
    navigation(v-once)
    router-view
    aFooter(v-once)
    pre {{ $store.state }}
</template>

<script>
  import Navigation from '=/App/Navigation'
  import AFooter from '=/App/Footer'

  export default {
    name: 'app',
    components: {
      Navigation,
      AFooter
    }
  }
</script>

<style lang='sass'>
  @import styles/bulma
  @import ~mdi/css/materialdesignicons.min.css
</style>
