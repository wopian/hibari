<template lang='pug'>
  .library
    p Whelp
</template>

<script>
  export default {
    metaInfo: {
      title: 'Library'
    },
    props: [
    ],
    data () {
      return {
        loading: false,
        error: null
      }
    },
    methods: {
    }
  }
</script>

<style lang='sass'>
  @import ~bootstrap/scss/variables
  @import ~bootstrap/scss/mixins
  @import ~bootstrap/scss/grid

  .library
    @extend .container
</style>
