<template lang='pug'>
  main

    .error(v-if='error') Error: {{ error }}

    .content(v-else)
      //- Cover to display  when data loaded
      .cover(
        v-if='manga'
        v-bind:style='{ backgroundImage: "url(" + (manga.coverImage ? manga.coverImage.original : "/kitsu/default_cover.png" )  + ")"}'
      )
        .container
          img(v-bind:src='manga.posterImage ? manga.posterImage.large : "/kitsu/default_poster.jpg"')
          div
            h2 {{ manga.canonicalTitle }}
            a.btn(:href='"//kitsu.io/manga/" + slug' rel='noopener' target='_blank') {{ $t('user.kitsuProfile') }}

      //- Placeholder cover while data loads
      .cover(
        v-else
        v-bind:style='{ backgroundImage: "url(/kitsu/default_cover.png)" }'
      )
        .container
          img(src='/kitsu/default_poster.jpg')
          div
            h2 {{ slug }}
            a.btn(:href='"//kitsu.io/manga/" + slug' rel='noopener' target='_blank') {{ $t('user.kitsuProfile') }}

      nav.navbar
        .container.nav
          router-link.nav-link(:to='{ name: "Stats" }' exact) {{ $t('user.navigation.profile') }}
          .navbar-text.ml-auto(v-if='updated') Updated {{ updated }}

      router-view(
        v-bind:slug='slug'
        v-bind:manga='manga'
      )

      spinner(v-if='loading' v-bind:message='$t("loader.collectingData")')

      //- RAW API DUMP START
      .container
        .title
          span API Manga
        details
          summary Show
          pre(v-if='manga') {{ manga }}
        //- RAW API DUMP END
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
