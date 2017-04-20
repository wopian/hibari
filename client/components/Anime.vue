<template lang='pug'>
  main.anime
    section.error(v-if='error') Error: {{ error }}

    section.content(v-else)
      .cover(
        v-if='anime && anime.slug === slug'
        v-bind:style='{ backgroundImage: "url(" + anime.coverImage.original + ")"}'
      )
        img(
          v-if='anime.posterImage.large'
          v-bind:src='anime.posterImage.large')
      .cover(v-else)

      nav
        div
          a(:href='"//kitsu.io/anime/" + slug' rel='noopener' target='_blank') Kitsu

      spinner(v-if='loading')

      .container
        hr
        p Anime
        pre(v-if='anime') {{ anime }}
</template>

<script>
  import moment from 'moment'
  import Spinner from 'components/util/Loader'
  import { Kitsu } from 'api'

  Kitsu.define('anime', {
    slug: '',
    titles: '',
    canonicalTitle: '',
    averageRating: '',
    ageRating: '',
    subtype: '',
    posterImage: '',
    coverImage: '',
    episodeCount: '',
    synopsis: ''
  }, { collectionPath: 'anime' })

  export default {
    metaInfo () {
      return {
        title: `${this.anime ? this.anime.canonicalTitle : this.slug}`
      }
    },
    components: {
      Spinner
    },
    data () {
      return {
        loading: false,
        error: null,
        slug: this.$route.params.slug,
        anime: null
      }
    },
    created () {
      this.checkStore()
    },
    methods: {
      checkStore () {
        // Check vuex store for user
        if (this.$store.state.anime[this.$route.params.slug] !== undefined) {
          this.displayData()
          console.info('[HB]: Data retrieved from store')
        // Store is empty
        } else {
          this.loading = true
          this.fetchData()
          console.info('[HB]: Data retrieved from API')
        }
      },
      displayData (updated, anime) {
        let animeStore = this.$store.state.anime[this.$route.params.slug]

        // Push data to state
        this.updated = moment(animeStore.updated).fromNow()
        this.anime = animeStore.anime

        // Disable loading state
        this.loading = false

        // Refresh data if older than 30 minutes
        if (moment().diff(animeStore.updated, 'minutes') > 30) {
          console.info('[HB]: Refreshing data')
          this.fetchData()
          console.info('[HB]: Updated store from API')
        }
      },
      fetchData () {
        this.error = this.anime = null
        this.loading = true

        Kitsu.findAll('anime', {
          filter: { slug: this.$route.params.slug },
          fields: {
          },
          page: { limit: 1 }
        })
        .then(res => {
          if (res.meta.count === 0) this.error = 'No anime exists'
          else {
            const updated = moment()

            res = res[0]

            // Add data to store
            this.$store.commit('ANIME', {
              data: { anime: res, updated },
              slug: this.slug
            })

            // Display (updated) data
            this.displayData()
          }
        })
        .catch(err => {
          this.error = err.toString()
        })
      }
    }
  }
</script>

<style lang='sass' scoped>
</style>
