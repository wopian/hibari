<template lang='pug'>
  #app
    navigation
    router-view
</template>

<script>
import Navigation from '@/components/App/Navigation'

export default {
  name: 'app',
  components: {
    Navigation
  },
  created () {
    const token = localStorage.getItem('token')
    if (token) this.$store.commit('SET_TOKEN', token)
  }
}
</script>

<style lang='sass'>
  @import styles/bootstrap
  // @import ~bootstrap/scss/functions
  // @import ~bootstrap/scss/variables
  // @import ~bootstrap/scss/mixins/hover
  // @import ~bootstrap/scss/reboot
</style>
