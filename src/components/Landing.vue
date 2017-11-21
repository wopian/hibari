<template lang='pug'>
  main
    img.banner(src='/landing.jpg')

    section.container
      h1.title.has-text-weight-bold Track The Latest Shows
      .columns.is-multiline
        .column.is-one-fifth(v-if='$store.state.landing.latest' v-for='item in $store.state.landing.latest')
          .card
            .card-image
              router-link.image(:to='{ name: "Anime", params: { slug: item.slug } }')
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
                span
                  b-icon(icon='star' size='is-small')
                  | {{ item.averageRating }}%
                span
                  b-icon(icon='account' size='is-small')
                  | {{ item.userCount }}
                span
                  b-icon(icon='heart' size='is-small')
                  | {{ item.ratingRank }}th
</template>

<script>
  import api from '@/api'

  export default {
    created () {
      this.getAnime()
    },
    methods: {
      async getAnime () {
        if (this.$store.state.landing.latest === null) {
          const { data } = await api.get('anime', {
            sort: '-averageRating',
            filter: {
              status: 'current'
            },
            fields: {
              anime: 'canonicalTitle,averageRating,userCount,ratingRank,posterImage,slug'
            },
            page: {
              limit: 10
            }
          })
          data.forEach(item => {
            delete item.links
            delete item.type
            item.posterImage = item.posterImage.medium
          })
          this.$store.commit('SAVE_LANDING_LATEST', data)
        }
      }
    }
  }
</script>

<style lang='sass' scoped>
  .banner
    width: 100vw
    min-height: 70vh
    max-height: 70vh
    object-fit: cover
    object-position: top
    margin-top: -52px
    pointer-events: none
    filter: blur(.0625rem)
    mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 85%, rgba(0,0,0,0))

  section
    padding-top: .6rem

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
