<template lang='pug'>
  flickity.columns(
    ref='flickity'
    :options='flickityOptions'
    v-if='data'
  )
    .carousel-cell.column.is-half-mobile.is-one-quarter-tablet.is-one-fifth-desktop(
      v-for='item in data')
      .card
        .card-image
          router-link.image(
            :to='{ name: subtype, params: { slug: item.slug } }'
          )
            img(:src='item.posterImage' :alt='item.canonicalTitle')
        .card-content
          b-tooltip(
            :label='item.canonicalTitle'
            position='is-top'
            size='is-small'
            type='is-dark'
            multilined
          )
            .title.is-6 {{ item.canonicalTitle }}
          .card-space.is-size-7
            span {{ item.averageRating }}%
            span {{ item.userCount }}
            span {{ item.ratingRank }}th
</template>

<script>
  import Flickity from 'vue-flickity'

  export default {
    components: {
      Flickity
    },
    props: {
      data: Array,
      subtype: String
    },
    data () {
      return {
        flickityOptions: {
          initialIndex: 3,
          prevNextButtons: false,
          pageDots: false,
          wrapAround: true
        }
      }
    }
  }
</script>

<style lang='sass'>
  .flickity-enabled:focus
    outline: none

  .flickity-viewport
    width: 100vw
    &.is-pointer-down a
      pointer-events: none
</style>

<style lang='sass' scoped>
  .title.is-6
    display: block
    height: 1.5rem
    white-space: nowrap
    text-overflow: ellipsis
    overflow: hidden;

  .card-content
    padding: .75rem
    .tooltip
      display: block
      height: 1.5rem

  .card-space
    display: flex
    justify-content: space-between
</style>
