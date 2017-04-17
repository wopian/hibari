<template lang='pug'>
  section.container
    .row
      .col-2(v-for='n in 12')
        .card
          img.card-img-top(src='//media.kitsu.io/anime/poster_images/11178/small.jpg?1452886316')
          .card-block
            p.card-text Osomatsu-san
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

<style lang='sass' scoped>
  // @import ~bootstrap/scss/variables
  // @import ~bootstrap/scss/mixins
  // @import ~bootstrap/scss/grid

  section
    padding-top: 1rem

  img
    width: 100%
    // border-radius: 3px

  p
    font-size: .75rem

  .row
    margin-right: -20px
    margin-left: -20px

  .col-2
    padding-left: 7.5px
    padding-right: 7.5px
    padding-bottom: 7.5px * 2
</style>
