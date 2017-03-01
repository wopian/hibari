<template lang='pug'>
  main.user
    section.error(v-if='error') Error: {{ error }}

    section.content(v-else)
      .cover(
        v-if='user && user.attributes.name.toLowerCase() === slug'
        v-bind:style='{ backgroundImage: "url(" + user.attributes.coverImage.original + ")"}'
      )
        .container
          img(
            v-if='user.attributes.avatar.large'
            v-bind:src='user.attributes.avatar.large')
          div
            h2 {{ user.attributes.name }}
              span(v-if='user.attributes.title') {{ user.attributes.title }}
            a(:href='"//kitsu.io/users/" + slug' rel='noopener' target='_blank') {{ $t('user.kitsuProfile') }}
      .cover(v-else)

      nav
        div
          router-link(:to='{ name: "Profile" }' exact) {{ $t('user.navigation.profile') }}
          router-link(:to='{ name: "Library" }' exact) {{ $t('user.navigation.library') }}

      router-view(
        v-bind:slug='slug'
        v-bind:user='user'
        v-bind:waifu='waifu'
        v-bind:pinned='pinnedPost'
        v-bind:profile-links='profileLinks'
        v-bind:favourites='favourites'
      )

      spinner(v-if='loading')
</template>

<script>
  import { Kitsu } from 'api'
  import Spinner from 'components/svg/Spinner'

  export default {
    metaInfo () {
      return {
        titleTemplate: `${this.user ? this.user.attributes.name : this.slug}'s %s | Hibari`
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
        user: null,
        waifu: null,
        pinnedPost: null,
        profileLinks: null,
        favourites: null
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
        this.loading = true
        // Check vuex store
        if (this.$store.state.user[this.$route.params.slug] !== undefined) {
          console.info('[HB]: Data retrived from store')
          this.displayData(true)
        } else if (localStorage.getItem(`user-${this.slug}`)) {
          console.info('[HB]: Data retrived from local storage')
          this.user = JSON.parse(localStorage.getItem(`user-${this.slug}`))[0].user
          this.waifu = JSON.parse(localStorage.getItem(`user-${this.slug}`))[1].waifu[0]
          this.pinnedPost = JSON.parse(localStorage.getItem(`user-${this.slug}`))[2].pinnedPost[0]
          this.profileLinks = JSON.parse(localStorage.getItem(`user-${this.slug}`))[3].profileLinks
          this.favourites = JSON.parse(localStorage.getItem(`user-${this.slug}`))[4].favourites
          this.loading = false
        } else {
          console.info('[HB]: Data retrived from API')
          this.fetchData()
        }
      },
      displayData (cached, user, include) {
        this.user = cached ? this.$store.state.user[this.slug] : user
        this.waifu = cached ? this.$store.state.waifu[this.slug][0] : include.waifu[0]
        this.pinnedPost = cached ? this.$store.state.pinnedPost[this.slug] : include.pinnedPost[0]
        this.profileLinks = cached ? this.$store.state.profileLinks[this.slug] : include.profileLinks
        this.favourites = cached ? this.$store.state.favourites[this.slug] : include.favourites
        this.loading = false
      },
      fetchData () {
        this.error = this.user = null
        // TODO: Get only specific fields: ?fields[attributes]=slug
        // TODO: For libraries sort items by last updated in request, e.g:
        // /people?sort=age,author.name
        // TODO: Stats for past week, month, year
        // //kitsu.io/api/edge/users/42603/library-entries?include=anime&filter[since]=2017-01-08
        // GLobal:
        // //kitsu.io/api/edge/library-entries?filter[kind]=anime&filter[since]=2017-02-10&page[limit]=10
        Kitsu.get(`users?include=waifu,pinnedPost,profileLinks,favorites.item&fields[characters]=slug,image&fields[manga]=slug,posterImage&fields[anime]=slug,posterImage&filter[name]=${this.$route.params.slug}`)
        .then(d => {
          console.log(d)
          d = d.data
          console.log(d)
          if (d.meta.count === 0) {
            this.error = 'No user exists'
          } else {
            let user, included, relation
            let include = {}

            user = d.data[0]
            // delete user.relationships

            relation = d.data[0].relationships
            included = d.included
            include.waifu = []
            include.pinnedPost = []
            include.profileLinks = []
            include.favourites = {characters: [], manga: [], anime: []}

            // Bind waifu relation to included data
            if (relation.waifu.data !== null) {
              included.forEach(link => {
                if (relation.waifu.data.id === link.id) {
                  console.log(`Waifu: ${relation.waifu.data.id}, Link: ${link.id}`)
                  include.waifu.push(link)
                }
              })
            }

            // Bind pinnedPost relation to included data
            if (relation.pinnedPost.data !== null) {
              included.forEach(link => {
                if (relation.pinnedPost.data.id === link.id) {
                  console.log(`Pinned: ${relation.pinnedPost.data.id}, Link: ${link.id}`)
                  include.pinnedPost.push(link)
                }
              })
            }

            // Bind profileLinks relation to included data
            relation.profileLinks.data.forEach(item => {
              included.forEach(link => {
                if (item.id === link.id) {
                  include.profileLinks.push(link)
                }
              })
            })

            // Bind favourites relation to included data
            relation.favorites.data.forEach(item => {
              included.forEach(link => {
                if (item.id === link.id) {
                  const type = link.relationships.item.data.type
                  include.favourites[type].push(
                    Object.assign(
                      link.attributes,
                      included.filter(
                        function (el) {
                          if (el.id === link.relationships.item.data.id) {
                            return true
                          }
                          return false
                        }
                      )
                    )
                  )
                }
              })
            })

            // Sort favourites by their rank
            include.favourites.characters.sort(this.numericSort('favRank'))
            include.favourites.manga.sort(this.numericSort('favRank'))
            include.favourites.anime.sort(this.numericSort('favRank'))

            // Save user data in vuex store
            this.$store.commit('USER', [user, this.slug])
            this.$store.commit('WAIFU', [include.waifu, this.slug])
            this.$store.commit('PINNEDPOST', [include.pinnedPost, this.slug])
            this.$store.commit('PROFILELINKS', [include.profileLinks, this.slug])
            this.$store.commit('FAVOURITES', [include.favourites, this.slug])

            // Save user data to local storage
            this.saveToLocalStorage(user, include.waifu, include.pinnedPost, include.profileLinks, include.favourites)

            // Display user information
            this.displayData(false, user, include)
          }
        })
        .catch(e => {
          this.error = e.toString()
        })
      },
      numericSort (key) {
        return (a, b) => {
          if (a[key] > b[key]) return 1
          if (a[key] < b[key]) return -1
          return 0
        }
      },
      saveToLocalStorage (user, waifu, pinnedPost, profileLinks, favourites) {
        // User doesn't exist - store data
        if (!localStorage.getItem(`user-${this.slug}`)) {
          localStorage.setItem(`user-${this.slug}`, JSON.stringify([
            { user: user },
            { waifu: waifu },
            { pinnedPost: pinnedPost },
            { profileLinks: profileLinks },
            { favourites: favourites }
          ], null, '\t'))
        }
      }
    }
  }
</script>

<style lang='sass'>
  @import ~bootstrap/scss/bootstrap.scss
  @import ~assets/variables

  main.user
    section.content
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
          @extend .btn
          font-size: 12px
          padding: 8px 40px
          margin-bottom: 10px
          background: $kitsu
          color: $white
          line-height: 1.25

      nav
        @extend .navbar
        background: $purewhite
        border-bottom: 1px solid $grey
        padding: 0
        width: 100vw
        position: sticky
        top: 56px
        z-index: 100
        transition: background 300ms ease-out

        div
          @extend .container
          @extend .nav

        a
          @extend .nav-link
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

      .content
        @extend .container
        margin-top: 1rem

        > div
          @extend .row

        .left, .right
          @extend .col

        @include media-breakpoint-up(md)
          .right
            text-align: right

        h1, .waifu
          @extend .display-4

        span
          display: block
          padding-top: .5rem
          font-size: 1.5rem
</style>
