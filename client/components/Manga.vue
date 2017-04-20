<template lang='pug'>
  main.manga
    section.error(v-if='error') Error: {{ error }}

    section.content(v-else)
      .cover(
        v-if='manga && manga.slug === slug'
        v-bind:style='{ backgroundImage: "url(" + manga.coverImage.original + ")"}'
      )
        img(
          v-if='manga.posterImage.large'
          v-bind:src='manga.posterImage.large')
      .cover(v-else)

      nav
        div
          a(:href='"//kitsu.io/manga/" + slug' rel='noopener' target='_blank') Kitsu

      spinner(v-if='loading')

      .container
        hr
        p Manga
        pre(v-if='manga') {{ manga }}
</template>

<script>
  import moment from 'moment'
  import Spinner from 'components/util/Loader'
  import { Kitsu } from 'api'

  Kitsu.define('manga', {
    slug: '',
    titles: '',
    canonicalTitle: '',
    averageRating: '',
    ageRating: '',
    subtype: '',
    posterImage: '',
    coverImage: '',
    chapterCount: '',
    synopsis: ''
  }, { collectionPath: 'manga' })

  export default {
    metaInfo () {
      return {
        title: `${this.manga ? this.manga.canonicalTitle : this.slug}`
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
        manga: null
      }
    },
    created () {
      this.checkStore()
    },
    methods: {
      checkStore () {
        // Check vuex store for user
        if (this.$store.state.manga[this.$route.params.slug] !== undefined) {
          this.displayData()
          console.info('[HB]: Data retrieved from store')
        // Store is empty
        } else {
          this.loading = true
          this.fetchData()
          console.info('[HB]: Data retrieved from API')
        }
      },
      displayData (updated, manga) {
        let mangaStore = this.$store.state.manga[this.$route.params.slug]

        // Push data to state
        this.updated = moment(mangaStore.updated).fromNow()
        this.manga = mangaStore.manga

        // Disable loading state
        this.loading = false

        // Refresh data if older than 30 minutes
        if (moment().diff(mangaStore.updated, 'minutes') > 30) {
          console.info('[HB]: Refreshing data')
          this.fetchData()
          console.info('[HB]: Updated store from API')
        }
      },
      fetchData () {
        this.error = this.manga = null
        this.loading = true

        Kitsu.findAll('manga', {
          filter: { slug: this.$route.params.slug },
          fields: {
          },
          page: { limit: 1 }
        })
        .then(res => {
          if (res.meta.count === 0) this.error = 'No manga exists'
          else {
            const updated = moment()

            res = res[0]

            // Add data to store
            this.$store.commit('MANGA', {
              data: { manga: res, updated },
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
