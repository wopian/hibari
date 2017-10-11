<template lang='pug'>
  main
    .jumbotron
      a(v-for='anime in $store.state.welcome.posterWall')
        img(:src='anime.posterImage.small')
    section
</template>

<script>
  import api from '@/api'

  export default {
    created () {
      this.getAnime()
    },
    methods: {
      async getAnime () {
        const { data } = await api.get('anime', {
          sort: '-startDate',
          filter: {
            averageRating: '75..'
          },
          fields: {
            anime: 'posterImage'
          },
          page: {
            limit: 20
          }
        })
        this.$store.commit('SET_POSTERWALL', data)
      }
    }
  }
</script>

<style lang='sass' scoped>
  @import ~bootstrap/scss/functions
  @import ~bootstrap/scss/variables
  @import ../styles/colours

  .jumbotron
    padding: 0
    display: flex
    flex-direction: row
    flex-wrap: wrap
    justify-content: space-between
    align-content: flex-start
    align-items: flex-start
    position: relative

    &:before
      content: ''
      position: absolute
      top: 0
      right: 0
      left: 0
      bottom: 0
      background-image: linear-gradient(to bottom,$purple .5%,rgba($purple, .5))

    a
      order: 0
      flex: 1 1 auto
      align-self: auto
      @media screen and (min-width: map-get($grid-breakpoints, xs)) and (max-width: map-get($grid-breakpoints, sm))
        width: 50vw
        &:nth-child(n+5)
          display: none
      @media screen and (min-width: map-get($grid-breakpoints, sm)) and (max-width: map-get($grid-breakpoints, md))
        width: 25vw
        &:nth-child(n+9)
          display: none
      @media screen and (min-width: map-get($grid-breakpoints, md)) and (max-width: map-get($grid-breakpoints, lg))
        width: 20vw
        &:nth-child(n+11)
          display: none
      @media screen and (min-width: map-get($grid-breakpoints, lg))
        width: 10vw

    img
      height: auto
      width: 100%
      object-position: center
</style>
