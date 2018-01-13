<template lang='pug'>
  main
    .hero
      .hero-body
        .container
          i18n.title(
            path='landing.title'
            tag='h1'
          )
            vue-typer(
              :text='typer.text'
              :initial-action='"erasing"'
              erase-style='backspace'
              :pre-type-delay='typer.speed'
              :type-delay='typer.speed'
              :pre-erase-delay=5000
              :erase-delay='typer.speed'
            )
          h2.subtitle(v-t='"landing.subtitle"')

    section.container
      h1.title.has-text-weight-bold Track The Latest Shows
      carousel-media(:data='$store.state.landing.latest' subtype='Anime')
</template>

<script>
  import { VueTyper } from 'vue-typer'
  import api from '@/api'
  import CarouselMedia from '=/Carousel/CarouselMedia'

  export default {
    components: {
      VueTyper,
      CarouselMedia
    },
    created () {
      this.getAnime()
    },
    data () {
      return {
        typer: {
          speed: 70,
          text: [
            this.$t('media.anime').toLowerCase(),
            this.$t('media.manga').toLowerCase()
          ]
        }
      }
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
              limit: 20
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

<style lang='sass'>
// Remove all styling Vue-Typer forces
.vue-typer
  all: unset
  .left, .char.custom.typed, .caret
    all: unset
    color: var(--colour-whiteSmoke)
</style>
