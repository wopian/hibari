<template lang='pug'>
  flickity(
    ref='flickity'
    :options='flickityOptions'
  )
    .carousel-cell.column(v-for='i in 10')
      .card
        .card-content
          .title.is-6 Canonical Title
          .card-space.is-size-7
            span Episode 1
</template>

<script>
  import Flickity from 'vue-flickity'

  export default {
    components: {
      Flickity
    },
    data () {
      return {
        flickityOptions: {
          initialIndex: 0,
          prevNextButtons: false,
          pageDots: false,
          wrapAround: true
        }
      }
    }
  }
</script>

<style lang='sass' scoped>
  .card
    width: 20rem
    height: calc(12rem - 52px / 1.25)
</style>
