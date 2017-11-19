<template lang='pug'>
  #app
    navigation
    router-view
    pre {{ $store.state }}
</template>

<script>
import Navigation from '@/components/App/Navigation'

export default {
  name: 'app',
  components: {
    Navigation
  }
}
</script>

<style lang='sass'>
  @import styles/bulma
  @import ~mdi/css/materialdesignicons.min.css
</style>
