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
  @import styles/bulma
  @import styles/app
</style>
