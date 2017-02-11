<template>
  <main class='user'>
    <spinner v-if='loading'></spinner>

    <section v-if='error' error>
      {{ error }}
    </section>

    <section content>
      <set-title v-if='user' :title='user.attr.name + " - Hibari"'></set-title>

      <div class='cover' v-if='user' :style='{ backgroundImage: "url(" + user.attr.coverImage.original + ")" }'>
        <big>Cover</big>
      </div>
      <div class='cover 2' v-else>
        <big>Loading</big>
      </div>

      <p>{{ $route.params.id }}</p>
      <pre v-if='user'>
ID: {{ user.id }}
Name: {{ user.attr.name }}
Past Names: {{ user.attr.pastNames }}
<!--About: {{ user.attr.about }}-->
Location: {{ user.attr.location }}
Waifu? {{ user.attr.waifuOrHusbando }}
Followers: {{ user.attr.followersCount }}
Following: {{ user.attr.followingCount }}
Joined: {{ user.attr.createdAt }}
Facebook: https://facebook.com/{{ user.attr.facebookId }}
Life Spent on Anime: {{ user.attr.lifeSpentOnAnime }}
Birthday: {{ user.attr.birthday }}
Gender: {{ user.attr.gender }}
Last Updated: {{ user.attr.updatedAt }}
Favourites: {{ user.attr.favouritesCount }}
Ratings: {{ user.attr.ratingsCount }}
Posts: {{ user.attr.postsCount }}
Comments: {{ user.attr.commentsCount }}
Likes Given: {{ user.attr.likesGivenCount }}
Likes Received: {{ user.attr.likesReceivedCount }}
Reviews: {{ user.attr.reviewsCount }}
Pro: {{ user.attr.proExpiresAt }}
      </pre>

      <img v-if='user' v-bind:src='user.attr.avatar.large'>
      <img v-if='user' v-bind:src='user.attr.coverImage.original'>

      <pre v-if='user'>{{ user }}</pre>
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
      this.$http.get('https://kitsu.io/api/edge/users?filter[name]=' + this.$route.params.id, {}, {
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
          this.user.attr = this.user.attributes
          delete this.user.attributes
          //delete this.user.relationships
          delete this.user.links
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
  pre {
    font-size: 50%;
  }

  main.user {
    section[content] {
      .cover {
        width: 100vw;
        height: 400px;
        background-color: darken(white, 15);
        background-size: cover;
        background-position: center;
      }
    }
  }
</style>
