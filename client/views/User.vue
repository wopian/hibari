<template lang='pug'>
  main.user
    section(v-if='error' error) {{ error }}

    section(v-else content)
      set-title(v-if='user' v-bind:title='user.attr.name')

      .cover(
        v-if='user && lw(user.attr.name) === slug'
        v-bind:style='{ backgroundImage: "url(" + user.attr.coverImage.original + ")"}'
      )
        img(v-if='user.attr.avatar.large' v-bind:src='user.attr.avatar.large')
      .cover(v-else)

      nav
        div
          router-link(:to='{ name: "Profile" }') {{ $t('user.navigation.profile')}}
          router-link(:to='{ name: "Library" }') {{ $t('user.navigation.library')}}
          a(:href='"//kitsu.io/users/" + slug' target='_blank') Kitsu

      router-view

      spinner(v-if='loading')

      .container
        hr
        p All information
        pre(v-if='user') {{ user }}

        hr
        p Waifu
        pre(v-if='waifu') {{ waifu }}

        hr
        p Pinned Post
        pre(v-if='pinned') {{ pinned }}

        hr
        p Profile Links
        pre(v-if='profileLinks') {{ profileLinks }}

        hr
        p Favourites
        pre(v-if='favourites') {{ favourites }}
</template>

<script>
import Spinner from 'components/Spinner'
import SetTitle from 'components/SetTitle'

export default {
  components: {
    Spinner,
    SetTitle
  },
  data () {
    return {
      loading: false,
      error: null,
      slug: this.$route.params.slug,
      lw: str => str.toLowerCase()
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.error = this.user = null
      this.loading = true

      // TODO: Get only specific fields: ?fields[attributes]=slug
      // TODO: For libraries sort items by last updated in request, e.g:
      // /people?sort=age,author.name
      // TODO: Stats for past week, month, year
      // https://kitsu.io/api/edge/users/42603/library-entries?include=anime&filter[since]=2017-01-08
      // Global:
      // https://kitsu.io/api/edge/library-entries?filter[kind]=anime&filter[since]=2017-02-10&page[limit]=10
      this.$http.get('https://kitsu.io/api/edge/users?include=waifu,pinnedPost,profileLinks,favorites&filter[name]=' + this.$route.params.slug, {}, {
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
          let user = data.body.data[0]
          user.attr = user.attributes
          delete user.attributes
          delete user.relationships
          this.$store.commit('USER', user)

          let included = data.body.included
          let include = {}

          include.characters = []
          include.posts = []
          include.profileLinks = []
          include.favourites = []

          included.forEach(element => {
            switch (element.type) {
              case ('characters'):
                include.characters.push(element)
                break
              case ('posts'):
                include.posts.push(element)
                break
              case ('profileLinks'):
                include.profileLinks.push(element)
                break
              case ('favorites'):
                include.favourites.push(element)
                break
            }
          })

          this.$store.commit('WAIFU', include.characters[0])
          this.$store.commit('PINNED', include.posts[0])
          this.$store.commit('PROFILELINKS', include.profileLinks[0])
          this.$store.commit('FAVOURITES', include.favourites[0])
        }
      })
      .catch((error) => {
        this.error = error.toString()
      })
    }
  },
  computed: {
    user () {
      return this.$store.state.user.user
    },
    waifu () {
      return this.$store.state.user.waifu
    },
    pinned () {
      return this.$store.state.user.pinned
    },
    profileLinks () {
      return this.$store.state.user.profileLinks
    },
    favourites () {
      return this.$store.state.user.favourites
    }
  }
}
</script>

<style lang='scss'>
  @import '~styles/main.scss';

  pre {
    font-size: 50%;
  }

  main.user {
    section[content] {
      .cover {
        margin-top: -56px;
        width: 100vw;
        height: 456px;
        background-color: $primary;
        background-size: cover;
        background-position: center;
        position: relative;

        img {
          left: calc((100vw - 10rem) / 2);
          border-radius: 999rem;
          width: 10rem;
          top: calc(50% - 56px);
          position: absolute;
          display: block;
          z-index: 501;
          pointer-events: none;
        }
      }

      nav {
        @extend .navbar;
        background: rgba(darken(white, 3), .9);
        border-bottom: 1px solid rgba(black, .05);
        width: 100vw;
        position: sticky;
        top: 56px;
        height: 46px;
        z-index: 100;
        backdrop-filter: blur(2px);
        transition: background 300ms ease-out;

        &:hover {
          background: darken(white, 3);
          transition: background 200ms ease-in;
        }

        div {
          @extend .container;
          @extend .nav;
        }

        a {
          @extend .nav-link;
          color: black;
          transition: color 200ms ease-out;
          padding: 0.16em 1em;

          &:hover {
            color: $primary;
            transition: color 100ms ease-out;
          }
        }
      }

      .content {
        @extend .container;
        margin-top: 1rem;

        > div {
          @extend .row;
        }

        .left, .right {
          @extend .col;
        }

        @include media-breakpoint-up(md) {
          .right {
            text-align: right;
          }
        }

        h1, .waifu {
          @extend .display-4;
        }

        span {
          display: block;
          padding-top: .5rem;
          font-size: 1.5rem;
        }
      }
    }
  }
</style>
