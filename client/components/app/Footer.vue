<template lang='pug'>
  footer.navbar
    .container.nav
      a.nav-link.mr-auto(href='https://github.com/wopian/hibari' rel='noopener' target='_blank') Github
      span.navbar-text Version {{ VERSION }}
</template>

<script>
  export default {
    data () {
      return {
        VERSION: VERSION
      }
    }
  }
</script>

<style lang='sass' scoped>
  @import ~styles/variables

  footer
    height: 54px
    background: $grey
    margin-top: 1rem

  a
    cursor: pointer
    color: $black
    &:hover
      color: $primary
</style>
