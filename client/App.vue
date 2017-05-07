<template lang='pug'>
  #app
    navbar
    router-view
    foobar
    notice
</template>

<script>
import Navbar from 'components/app/Navbar'
import Notice from 'components/app/Notice'
import Footer from 'components/app/Footer'

export default {
  name: 'app',
  metaInfo () {
    return {
      titleTemplate: `%s | ${this.$t('hibari')}`
    }
  },
  components: {
    Navbar,
    Notice,
    Foobar: Footer
  }
}
</script>

<style lang='sass'>
  @import ~bootstrap/scss/variables
  @import ~bootstrap/scss/mixins
  @import ~bootstrap/scss/normalize
  // @import ~bootstrap/scss/print
  @import ~bootstrap/scss/reboot
  @import ~bootstrap/scss/type
  // @import ~bootstrap/scss/images
  // @import ~bootstrap/scss/code
  @import ~bootstrap/scss/grid
  // @import ~bootstrap/scss/tables
  @import ~bootstrap/scss/forms
  @import ~bootstrap/scss/buttons
  // @import ~bootstrap/scss/transitions
  // @import ~bootstrap/scss/dropdown
  @import ~bootstrap/scss/button-group
  // @import ~bootstrap/scss/input-group
  // @import ~bootstrap/scss/custom-forms
  @import ~bootstrap/scss/nav
  @import ~bootstrap/scss/navbar
  @import ~bootstrap/scss/card
  // @import ~bootstrap/scss/breadcrumb
  // @import ~bootstrap/scss/pagination
  // @import ~bootstrap/scss/badge
  @import ~bootstrap/scss/jumbotron
  @import ~bootstrap/scss/alert
  // @import ~bootstrap/scss/progress
  // @import ~bootstrap/scss/media
  // @import ~bootstrap/scss/list-group
  // @import ~bootstrap/scss/responsive-embed
  @import ~bootstrap/scss/close
  // @import ~bootstrap/scss/modal
  // @import ~bootstrap/scss/tooltip
  // @import ~bootstrap/scss/popover
  // @import ~bootstrap/scss/carousel
  @import ~bootstrap/scss/utilities
</style>

<style lang='sass' scoped>
  @import ~styles/variables

  #app
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    display: flex
    flex-direction: column
    min-height: 100vh
    font-family: 'Asap', apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif
    background: $white
    main
      flex: 3
</style>

<style lang='sass'>
  @import ~styles/variables

  .os
    font-family: 'Open Sans', apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif
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

<style lang='sass'>
  @import ~styles/components/mediaBox
</style>
