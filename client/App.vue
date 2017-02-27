<template lang='pug'>
  #app
    navbar
    router-view
    notice
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

  #app
    // -webkit-font-smoothing: antialiased
    // -moz-osx-font-smoothing: grayscale
    display: flex
    flex-direction: column
    min-height: 100vh
    font-family: 'Asap', sans-serif
    background: $white

    main
      flex: 3

  .os
    font-family: 'Open Sans', sans-serif
    font-size: 14px

  .title
    display: block
    overflow: hidden
    white-space: nowrap
    text-align: center
    margin-bottom: 15px
    font-size: 14px
    font-weight: 700
    color: $black

    span
      position: relative
      display: inline-block

      &:before,
      &:after
        content: ''
        position: absolute
        top: 50%
        width: 100vw
        height: 1px
        background: $grey

      &:before
        right: 100%
        margin-right: 1rem

      &:after
        left: 100%
        margin-left: 1rem
</style>
