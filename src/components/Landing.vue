<template lang='pug'>
  main
    .jumbotron
      a(v-for='poster in $store.state.landing.posterWall' :href='`//kitsu.io/anime/` + poster.id')
        img(:src='poster.img')
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
        if (!this.$store.state.landing.posterWall) {
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

          data.forEach((item, index) => {
            data[index] = {
              id: item.id,
              img: item.posterImage.small
            }
          })

          this.$store.commit('SET_POSTERWALL', data)
        }
      }
    }
  }
</script>

<style lang='sass' scoped>
  .jumbotron
    padding: 0
    display: flex
    flex-direction: row
    flex-wrap: wrap
    justify-content: space-between
    align-content: flex-start
    align-items: flex-start
    position: relative
    pointer-events: none
</style>
