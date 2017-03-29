<template lang='pug'>
  main.error
    h1 404
</template>

<script>
  export default {
    metaInfo: {
      title: '404'
    }
  }
</script>

<style lang='sass'>
  @import ~bootstrap/scss/variables
  @import ~bootstrap/scss/mixins
  @import ~bootstrap/scss/grid

  main.error
    @extend .container
    padding-top: calc(56px + 1rem)
    h1
      font-weight: 700
      text-align: center
</style>
