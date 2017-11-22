<template lang='pug'>
  #app
    navigation(v-once)
    router-view
    aFooter(v-once)
</template>

<script>
  import Navigation from '=/layout/navigation'
  import AFooter from '=/layout/footer'

  export default {
    name: 'app',
    components: {
      Navigation,
      AFooter
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
