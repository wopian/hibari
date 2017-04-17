<template lang='pug'>
  main

    .error(v-if='error') Error: {{ error }}

    .content(v-else)
      //- Cover to display  when data loaded
      .cover(
        v-if='user'
        v-bind:style='{ backgroundImage: "url(" + (user.coverImage ? user.coverImage.original : "/kitsu/default_cover.png" )  + ")"}'
      )
        .container
          img(v-bind:src='user.avatar ? user.avatar.large : "/kitsu/default_avatar.png"')
          div
            h2 {{ user.name }}
              span(v-if='user.title') {{ user.title }}
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
        v-bind:user='user'
      )

      spinner(v-if='loading' v-bind:message='$t("loader.collectingData")')
</template>

<script>
  import moment from 'moment'
  import { Kitsu } from 'api'
  import Spinner from 'components/util/Loader'

  Kitsu.define('user', {
    name: '',
    about: '',
    location: '',
    waifuOrHusbando: '',
    followersCount: '',
    createdAt: '',
    followingCount: '',
    lifeSpentOnAnime: '',
    birthday: '',
    gender: '',
    updatedAt: '',
    commentsCount: '',
    favoritesCount: '',
    likesGivenCount: '',
    reviewsCount: '',
    likesReceivedCount: '',
    postsCount: '',
    ratingsCount: '',
    proExpiresAt: '',
    title: '',
    avatar: '',
    coverImage: '',
    waifu: {
      jsonApi: 'hasOne',
      type: 'characters'
    },
    pinnedPost: {
      jsonApi: 'hasOne',
      type: 'posts'
    },
    profileLinks: {
      jsonApi: 'hasMany',
      type: 'profileLinks'
    },
    favorites: {
      jsonApi: 'hasMany',
      type: 'favorites'
    }
  })

  Kitsu.define('character', {
    slug: '',
    name: '',
    image: ''
  })

  Kitsu.define('post', {
    contentFormatted: '',
    commentsCount: '',
    postLikesCount: '',
    spoiler: '',
    nsfw: '',
    createdAt: '',
    editedAt: ''
  })

  Kitsu.define('profileLink', {
    url: ''
  })

  Kitsu.define('favorite', {
    favRank: '',
    item: {
      jsonApi: 'hasOne',
      type: ['characters', 'anime', 'manga']
    }
  })

  Kitsu.define('anime', {
    slug: '',
    canonicalTitle: '',
    posterImage: ''
  })

  Kitsu.define('manga', {
    slug: '',
    canonicalTitle: '',
    posterImage: ''
  })

  export default {
    metaInfo () {
      return {
        titleTemplate: `${this.user ? this.user.name : this.slug}'s %s | ${this.$t('hibari')}`
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
        user: null
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
        // Check vuex store for user
        if (this.$store.state.user[this.$route.params.slug] !== undefined) {
          this.displayData()
          console.info('[HB]: Data retrieved from store')
        // Store is empty
        } else {
          this.loading = true
          this.fetchData()
          console.info('[HB]: Data retrieved from API')
        }
      },
      displayData (updated, user, include) {
        let userStore = this.$store.state.user[this.$route.params.slug]

        // Push data to state
        this.updated = moment(userStore.updated).fromNow()
        this.user = userStore.user

        // Disable loading state
        this.loading = false

        // Refresh data if older than 30 minutes
        if (moment().diff(userStore.updated, 'minutes') > 30) {
          console.info('[HB]: Refreshing data')
          this.fetchData()
          console.info('[HB]: Updated store from API')
        }
      },
      fetchData () {
        // TODO: Get only specific fields: ?fields[attributes]=slug
        // TODO: For libraries sort items by last updated in request, e.g:
        // /people?sort=age,author.name
        // TODO: Stats for past week, month, year
        // //kitsu.io/api/edge/users/42603/library-entries?include=anime&filter[since]=2017-01-08
        // GLobal:
        // //kitsu.io/api/edge/library-entries?filter[kind]=anime&filter[since]=2017-02-10&page[limit]=10
        // -----------------------------------------------------------------------------------------

        Kitsu.findAll('user', {
          filter: { name: this.$route.params.slug },
          include: 'waifu,pinnedPost,profileLinks,favorites.item',
          fields: {
            characters: 'slug,image,name',
            manga: 'slug,posterImage,canonicalTitle',
            anime: 'slug,posterImage,canonicalTitle'
          }
        })
        .then(res => {
          if (res.meta.count === 0) this.error = 'No user exists'
          else {
            const updated = moment()

            res = res[0]

            console.log(res)

            // Sort favourites by their rank
            res.favorites.sort(this.numericSort('favRank'))

            // Add data to store
            this.$store.commit('USER', {
              data: { user: res, updated },
              slug: this.slug
            })

            // Display (updated) data
            this.displayData()
          }
        })
        .catch(err => {
          this.error = err.toString()
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

<style lang='sass' scoped>
  // @import ~bootstrap/scss/bootstrap.scss
  // @import ~bootstrap/scss/variables
  // @import ~bootstrap/scss/mixins
  @import ~assets/variables

  .error
    padding-top: calc(56px + 1rem)

  .content
    .cover
      height: 400px
      background-color: $primary
      background-size: cover
      background-position: center
      position: relative
      display: flex
      align-items: flex-end

      &:before
        content: ''
        position: absolute
        top: 0
        right: 0
        bottom: 0
        left: 0
        background: rgba(black, .5)

      > div
        padding-bottom: 30px
        padding-left: 0
        display: flex
        flex-direction: row
        justify-content: flex-start
        align-items: flex-end

        div
          padding-left: 1px

      img
        border-radius: 999rem
        width: 100px
        z-index: 501
        pointer-events: none
        margin-right: 24px

      h2
        color: $white
        font-weight: 500
        font-size: 30px
        padding-bottom: 1px

        span
          background: $kitsu
          border-radius: 3px
          text-transform: uppercase
          font-size: 13px
          padding: 3px 10px
          position: relative
          left: 8px
          top: -4px
          font-weight: 400
          line-height: 1

      a
        font-size: 12px
        padding: 8px 40px
        margin-bottom: 10px
        background: $kitsu
        color: $white
        line-height: 1.25

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
