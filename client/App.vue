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
  @import ~assets/variables

  .os
    font-family: 'Open Sans', sans-serif
    font-size: 14px

  #app
    // -webkit-font-smoothing: antialiased
    // -moz-osx-font-smoothing: grayscale
    display: flex
    flex-direction: column
    min-height: 100vh
    font-family: 'Asap', sans-serif
    background: #fafafa

    main
      flex: 3
</style>
