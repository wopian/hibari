<template lang='pug'>
  #app
    navbar
    notice
    router-view
    foobar

</template>

<script>
import Navbar from 'components/app/Navbar'
import Notice from 'components/app/Notice'
import Footer from 'components/app/Footer'

export default {
  name: 'app',
  metaInfo: {
    title: 'Dashboard',
    titleTemplate: '%s | Hibari'
  },
  components: {
    Navbar,
    Notice,
    Foobar: Footer
  }
}
</script>

<style lang='sass'>
  @import ~bootstrap/scss/bootstrap

  #app
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    padding-top: calc(56px)
    display: flex
    flex-direction: column
    min-height: 100vh

    main
      flex: 3
</style>
