<template>
  <main class='user'>
    <spinner v-if='loading'></spinner>

    <section v-if='error' error>
      {{ error }}
    </section>

    <section v-else content>
      <set-title v-if='user' :title='user.attr.name + " - Hibari"'></set-title>

      <div class='cover' v-if='user' :style='{ backgroundImage: "url(" + user.attr.coverImage.original + ")" }'>
        <img v-if='user.attr.avatar.large' v-bind:src='user.attr.avatar.large'>
      </div>
      <div class='cover 2' v-else></div>

      <nav>
        <div>
          <router-link :to='{ name: "User" }'>Profile</router-link>
          <router-link :to='{ name: "Library" }'>Library</router-link>
        </div>
      </nav>

      <div class='content' v-if='user'>
        <div>
          <div class='left'>
            <h1>{{ user.attr.name }}</h1>
          </div>

          <div class='right'>
            <p class='waifu'>
              {{ waifu.attributes.name }}
              <span>{{ user.attr.waifuOrHusbando }}</span>
            </p>
          </div>
        </div>
      </div>

      <hr>
      All information
      <pre v-if='user'>{{ user }}</pre>

      <hr>
      Waifu
      <pre v-if='waifu'>{{ waifu }}</pre>

      <hr>
      Pinned Post
      <pre v-if='pinned'>{{ pinned }}</pre>

      <hr>
      Profile Links
      <pre v-if='pinned'>{{ profileLinks }}</pre>

      <hr>
      Favourites
      <pre v-if='pinned'>{{ favourites }}</pre>
    </section>
  </main>
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
      user: null,
      waifu: null,
      pinned: null,
      profileLinks: null,
      favourites: null,
      error: null
    }
  },
  created () {
    this.fetchData()
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      this.error = this.user = null
      this.loading = true

      // TODO: ?include=relationshipdata
      // TODO: Get only specific fields: ?fields[attributes]=slug
      // TODO: For libraries sort items by last updated in request, e.g:
      // /people?sort=age,author.name
      this.$http.get('https://kitsu.io/api/edge/users?include=waifu,pinnedPost,profileLinks,favorites&filter[name]=' + this.$route.params.id, {}, {
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
          this.user = data.body.data[0]
          this.waifu = data.body.included[0]
          this.pinned = data.body.included[1]
          this.profileLinks = data.body.included[2]
          this.favourites = data.body.included[3]
          this.user.attr = this.user.attributes
          delete this.user.attributes
          // delete this.user.relationships
          // delete this.user.links
        }
      })
      .catch((error) => {
        this.error = error.toString()
      })
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
          bottom: -5rem;
          position: absolute;
          display: block;
          z-index: 101;
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
