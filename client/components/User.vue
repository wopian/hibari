<template lang='pug'>
  main

    .error(v-if='error') Error: {{ error }}

    .content(v-else)
      //- Cover to display  when data loaded
      .cover(
        v-if='profile'
        v-bind:style='{ backgroundImage: "url(" + (profile.coverImage ? profile.coverImage.original : "/kitsu/default_cover.png" )  + ")"}'
      )
        .container
          img(v-bind:src='profile.avatar ? profile.avatar.large : "/kitsu/default_avatar.png"')
          div
            h2 {{ profile.name }}
              span(v-if='profile.title') {{ profile.title }}
            a.btn(:href='"//kitsu.io/users/" + slug' rel='noopener' target='_blank') {{ $t('user.kitsuProfile') }}

      //- Placeholder cover while data loads
      .cover(
        v-else
        v-bind:style='{ backgroundImage: "url(/kitsu/default_cover.png)" }'
      )
        .container
          img(src='/kitsu/default_avatar.png')
          div
            h2 {{ slug }}
            a.btn(:href='"//kitsu.io/users/" + slug' rel='noopener' target='_blank') {{ $t('user.kitsuProfile') }}

      nav.navbar
        .container.nav
          router-link.nav-link(:to='{ name: "Profile" }' exact) {{ $t('user.navigation.profile') }}
          router-link.nav-link(:to='{ name: "Library" }' exact) {{ $t('user.navigation.library') }}
          .navbar-text.ml-auto(v-if='updated') Updated {{ updated }}

      router-view(
        v-bind:slug='slug'
        v-bind:profile='profile'
        v-bind:library='library'
      )

      spinner(v-if='loading' v-bind:message='$t("loader.collectingData")')
</template>

<script>
  import moment from 'moment'
  import { Kitsu } from 'api'
  import Spinner from 'components/util/Loader'

  export default {
    metaInfo () {
      return {
        titleTemplate: `${this.profile ? this.profile.name : this.slug}'s %s | ${this.$t('hibari')}`
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
        updated: null,
        profile: null,
        library: null
      }
    },
    created () {
      this.checkStore()
    },
    methods: {
      // We don't want to request data from the API if it was accessed in the current session
      // First we check the vuex store
      // Second we check local storage
      // Else download the data and add it to the vuex store and local storage
      checkStore () {
        // Check vuex store for user && fallback for old session states
        if (this.$store.state.user[this.slug] !== undefined) {
          this.displayProfile()
          this.displayLibrary()
          console.info('[HB]: Data retrieved from store')
        // Store is empty
        } else {
          this.loading = true
          this.fetchProfile()
          console.info('[HB]: Data retrieved from API')
        }
      },
      displayProfile () {
        // Get data from state
        this.updated = moment(this.$store.state.user[this.slug].updated).fromNow()
        this.profile = this.$store.state.user[this.slug].profile

        // Disable loading state
        this.loading = false

        // Refresh data if older than 12 hours
        if (moment().diff(this.$store.state.user[this.slug].updated, 'hours') > 12) {
          console.info('[HB]: Refreshing data')
          this.fetchProfile()
          console.info('[HB]: Updated store from API')
        }
      },
      displayLibrary () {
        this.library = this.$store.state.user[this.slug].library
      },
      async fetchProfile () {
        // TODO: For libraries sort items by last updated in request, e.g:
        // /people?sort=age,author.name
        // TODO: Stats for past week, month, year
        // //kitsu.io/api/edge/users/42603/library-entries?include=anime&filter[since]=2017-01-08
        // GLobal:
        // //kitsu.io/api/edge/library-entries?filter[kind]=anime&filter[since]=2017-02-10&page[limit]=10
        // -----------------------------------------------------------------------------------------
        try {
          let response = await Kitsu.findAll('user', {
            filter: { name: this.$route.params.slug },
            include: 'waifu,pinnedPost,profileLinks,favorites.item',
            fields: {
              characters: 'slug,image,name',
              manga: 'slug,posterImage,canonicalTitle',
              anime: 'slug,posterImage,canonicalTitle'
            }
          })

          if (response.meta.count === 0) this.error = 'No user exists'
          else {
            const updated = moment()

            response = await response[0]

            // Get library data
            this.fetchLibrary(response.id, 'anime', 0)
            this.fetchLibrary(response.id, 'manga', 0)

            // Sort favourites by their rank
            response.favorites.sort(this.numericSort('favRank'))

            // Pre-filter favorites by type
            let favorites = response.favorites
            response.favorites = { anime: [], manga: [], characters: [] }
            response.favorites.anime = this.filterFavorites(favorites, 'anime')
            response.favorites.manga = this.filterFavorites(favorites, 'manga')
            response.favorites.characters = this.filterFavorites(favorites, 'characters')

            // Add data to store
            this.$store.commit('PROFILE', {
              data: { profile: response, updated },
              slug: this.slug
            })

            // Display (updated) data
            this.displayProfile()
          }
        } catch (err) {
          if (err) this.error = err.toString()
          else this.error = 'Unidentified error occured while fetching profile'
        }
      },
      async fetchLibrary (id, kind = 'anime', offset = 0) {
        try {
          const limit = 1 // 500
          const fields = {
            all: 'genres,slug,canonicalTitle,averageRating,userCount,startDate,endDate,popularityRank,ratingRank,ageRating,subtype,',
            anime: 'episodeCount,episodeLength',
            manga: 'chapterCount,volumeCount,serialization'
          }

          console.log(`Getting library ${offset}`)
          console.log(fields.all + fields.anime)

          let response = await Kitsu.findAll('libraryEntry', {
            filter: { kind, user_id: id },
            fields: {
              libraryEntries: `${kind},status,progress,reconsumeCount,updatedAt,ratingTwenty`,
              anime: kind === 'anime' ? fields.all + fields.anime : 'id',
              manga: kind === 'manga' ? fields.all + fields.manga : 'id',
              genres: 'name'
            },
            include: `${kind}.genres`,
            sort: '-updatedAt',
            page: { limit, offset }
          })

          console.log(response)

          console.log(`Loaded library ${offset}`)

          // await delete response.type

          // Add data to store
          await this.$store.commit('LIBRARY', {
            data: response,
            slug: this.slug,
            kind
          })

          console.log(`Stored library ${offset}`)

          this.displayLibrary()

          // if (response.links.next) await this.fetchLibrary(id, kind, offset + limit)
        } catch (err) {
          if (err) this.error = err.toString()
          else this.error = `Unidentified error occured while fetching ${kind} library`
        }
      },
      filterFavorites (array, type) {
        return array.filter(fav => {
          return (fav.item.type === type)
        })
      },
      numericSort (key) {
        return (a, b) => {
          if (a[key] > b[key]) return 1
          if (a[key] < b[key]) return -1
          return 0
        }
      }
    }
  }
</script>

<style lang='sass'>
  @import ~styles/components/cover
</style>

<style lang='sass' scoped>
  @import ~styles/variables

  .error
    padding-top: calc(56px + 1rem)

  .content
    nav
      background: $purewhite
      border-bottom: 1px solid $grey
      padding: 0
      position: sticky
      top: 54.78px
      z-index: 100
      transition: background 300ms ease-out

      div
        padding-right: 0

      a
        color: rgba(black, .3)
        transition: color 100ms ease-out
        padding: 10px 20px
        font-size: 14px
        border-left: 1px solid $grey

        &.router-link-active
          color: $primary

        &:last-of-type
          border-right: 1px solid $grey

        &:hover:not(.router-link-active)
          color: rgba($primary, .8)
          background: $white
          transition: color 100ms ease-in-out

      .navbar-text
        color: rgba(black, .3)
        padding: 10px 0 10px 20px
        font-size: 14px
</style>
