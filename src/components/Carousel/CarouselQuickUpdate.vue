<template lang='pug'>
  lory.columns.quick-update(
    :options='options'
  )
    prev(slot='actions')
    next(slot='actions')
    item.column(
      v-for='i in 10'
      :key='i'
    )
      .card
        .card-content
          .title.is-6 Canonical Title
          .card-space.is-size-7
            span Episode {{ i }}
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
          infinite: 6
        }
      }
    }
  }
</script>

<style lang='sass'>
  .quick-update
    .js_prev.prev
      display: none
    .js_next.next
      height: 100%
      top: 0
      margin: 0 -.75rem 0 0
      padding: .75rem 0
      svg
        height: 100%
        background: var(--colour-haiti)
        width: 4rem
        path
          fill: var(--colour-whiteSmoke)
        &:hover path
          fill: var(--colour-cinnabar)
    &.slider li
      width: auto
</style>

<style lang='sass' scoped>
  .quick-update
    position: relative
  .column
    height: calc(12rem)
  .card
    width: 20rem
    height: 100%
</style>
