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
        v-bind:pinned='pinned'
        v-bind:profile-links='profileLinks'
        v-bind:favourites='favourites'
      )

      spinner(v-if='loading')
</template>

<script>
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
        pinned: null,
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
        // } else if (localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'))[this.slug]) {
        } else if (localStorage.getItem(`user-${this.slug}`)) {
          console.info('[HB]: Data retrived from local storage')
          this.user = JSON.parse(localStorage.getItem(`user-${this.slug}`))[0].user
          this.waifu = JSON.parse(localStorage.getItem(`user-${this.slug}`))[1].waifu[0]
          this.pinned = JSON.parse(localStorage.getItem(`user-${this.slug}`))[2].pinned[0]
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
        this.pinned = cached ? this.$store.state.pinned[this.slug] : include.pinned[0]
        this.profileLinks = cached ? this.$store.state.profileLinks[this.slug] : include.profileLinks
        this.favourites = cached ? this.$store.state.favourites[this.slug] : include.favourites
        this.loading = false
      },
      fetchData () {
        this.error = this.user = null
        this.loading = true
        // TODO: Get only specific fields: ?fields[attributes]=slug
        // TODO: For libraries sort items by last updated in request, e.g:
        // /people?sort=age,author.name
        // TODO: Stats for past week, month, year
        // //kitsu.io/api/edge/users/42603/library-entries?include=anime&filter[since]=2017-01-08
        // GLobal:
        // //kitsu.io/api/edge/library-entries?filter[kind]=anime&filter[since]=2017-02-10&page[limit]=10
        this.$http.get(`https://kitsu.io/api/edge/users?include=waifu,pinnedPost,profileLinks,favorites&filter[name]=${this.$route.params.slug}`, {}, {
          headers: {
            'Content-Type': 'application/vnd.api+json',
            'Accept': 'application/vnd.api+json',
            'User-Agent': 'hibari'
          }
        })
        .then((data) => {
          this.loading = false
          if (data.body.meta.count === 0) {
            this.error = 'No user exists'
          } else {
            let user, included
            let include = {}

            user = data.body.data[0]
            delete user.relationships

            included = data.body.included
            include.waifu = []
            include.pinned = []
            include.profileLinks = []
            include.favourites = []

            included.forEach(el => {
              switch (el.type) {
                case ('characters'):
                  include.waifu.push(el)
                  break
                case ('posts'):
                  include.pinned.push(el)
                  break
                case ('profileLinks'):
                  include.profileLinks.push(el)
                  break
                case ('favorites'):
                  include.favourites.push(el)
                  break
              }
            })

            // Save user data in vuex store
            this.$store.commit('USER', [user, this.slug])
            this.$store.commit('WAIFU', [include.waifu, this.slug])
            this.$store.commit('PINNED', [include.pinned, this.slug])
            this.$store.commit('PROFILELINKS', [include.profileLinks, this.slug])
            this.$store.commit('FAVOURITES', [include.favourites, this.slug])

            // Save user data to local storage
            this.saveToLocalStorage(user, include.waifu, include.pinned, include.profileLinks, include.favourites)

            // Display user information
            this.displayData(false, user, include)
          }
        })
        .catch((error) => {
          this.error = error.toString()
        })
      },
      saveToLocalStorage (user, waifu, pinned, profileLinks, favourites) {
        // User doesn't exist - store data
        if (!localStorage.getItem(`user-${this.slug}`)) {
          localStorage.setItem(`user-${this.slug}`, JSON.stringify([
            { user: user },
            { waifu: waifu },
            { pinned: pinned },
            { profileLinks: profileLinks },
            { favourites: favourites }
          ], null, '\t'))
        }
      }
    }
  }
</script>

<style lang='sass'>
  @import ~bootstrap/scss/bootstrap
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
          color: white
          font-weight: 500
          font-size: 30px
          padding-bottom: 1px

          span
            background: #F75239
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
          color: white
          line-height: 1.25

      nav
        @extend .navbar
        background: white
        border-bottom: 1px solid rgba(black, .05)
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
          border-left: 1px solid #eee

          &.router-link-active
            color: $primary

          &:last-of-type
            border-right: 1px solid #eee

          &:hover:not(.router-link-active)
            color: rgba($primary, .8)
            background: #fafafa
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
