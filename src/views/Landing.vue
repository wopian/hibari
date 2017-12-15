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
      .columns.is-multiline.is-mobile
        .column.is-half-mobile.is-one-quarter-tablet.is-one-fifth-desktop(
          v-if='$store.state.landing.latest'
          v-for='item in $store.state.landing.latest')
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
                span {{ item.averageRating }}%
                span {{ item.userCount }}
                span {{ item.ratingRank }}th
</template>

<script>
  import { VueTyper } from 'vue-typer'
  import api from '@/api'

  export default {
    components: {
      VueTyper
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
  .hero
    background: var(--colour-haiti)
    height: calc((3.5rem * 1.9) + 12rem)
    margin-top: -3.5rem
    padding-top: 3.5rem * 1.9
    .title, .subtitle
      color: var(--colour-whiteSmoke)

  section
    padding-top: 1rem

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

<style lang='sass'>
// Remove all styling Vue-Typer forces
.vue-typer
  all: unset
  .left, .char.custom.typed, .caret
    all: unset
    color: var(--colour-whiteSmoke)
</style>
