<template lang='pug'>
  lory.columns(
    v-if='data'
    :options='options'
  )
    prev(slot='actions')
    next(slot='actions')
    item.column.is-half-mobile.is-one-quarter-tablet.is-one-fifth-desktop(
      v-for='(item, index) in data'
      :key='index'
    )
      .card
        .card-image
          router-link.image(:to='{ name: subtype, params: { slug: item.slug } }')
            img(
              :src='item.posterImage'
              :alt='item.canonicalTitle'
            )
        .card-content
          .title.is-6 {{ item.canonicalTitle }}
          .card-space.is-size-7
            span {{ item.averageRating }}%
            span {{ item.userCount }}
            span {{ item.ratingRank }}th
</template>

<script>
  import { Lory, Item, Prev, Next } from 'vue-lory'

  export default {
    components: {
      Lory,
      Item,
      Prev,
      Next
    },
    props: {
      data: Array,
      subtype: String
    },
    data () {
      return {
        options: {
          enableMouseEvents: true,
          infinite: 5,
          slidesToScroll: 2
        }
      }
    }
  }
</script>

<style lang='sass'>
  .js_prev.prev
    margin-left: -2rem
  .js_next.next
    margin-right: -2rem
  .js_slide
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

  .title
    margin-bottom: 0
    text-align: left

  .card-space
    display: flex
    justify-content: space-between
</style>
