<template>
  <main class='user'>
    <h1>User</h1>

    <spinner v-if='loading'></spinner>

    <div class='error' v-if='error'>
      {{ error }}
    </div>

    <div class='content' v-if='user'>
      <set-title :title='user.attributes.name + " - Hibari"'></set-title>
      <p>{{ $route.params.id }}</p>
      <pre>
ID: {{ user.id }}
Name: {{ user.attributes.name }}
Past Names: {{ user.attributes.pastNames }}
<!--About: {{ user.attributes.about }}-->
Location: {{ user.attributes.location }}
Waifu? {{ user.attributes.waifuOrHusbando }}
Followers: {{ user.attributes.followersCount }}
Following: {{ user.attributes.followingCount }}
Joined: {{ user.attributes.createdAt }}
Facebook: https://facebook.com/{{ user.attributes.facebookId }}
Life Spent on Anime: {{ user.attributes.lifeSpentOnAnime }}
Birthday: {{ user.attributes.birthday }}
Gender: {{ user.attributes.gender }}
Last Updated: {{ user.attributes.updatedAt }}
Favourites: {{ user.attributes.favouritesCount }}
Ratings: {{ user.attributes.ratingsCount }}
Posts: {{ user.attributes.postsCount }}
Comments: {{ user.attributes.commentsCount }}
Likes Given: {{ user.attributes.likesGivenCount }}
Likes Received: {{ user.attributes.likesReceivedCount }}
Reviews: {{ user.attributes.reviewsCount }}
Pro: {{ user.attributes.proExpiresAt }}
      </pre>

      <img v-bind:src='user.attributes.avatar.large'>
      <img v-bind:src='user.attributes.coverImage.original'>
    </div>
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
    fetchData: () => {
      this.error = this.user = null
      this.loading = true

      this.$http.get('https://kitsu.io/api/edge/users?filter[name]=' + this.$route.params.id, {}, {
        headers: {
          'Content-Type': 'application/vnd.api+json',
          'Accept': 'application/vnd.api+json'
        }
      })
      .then((data) => {
        this.loading = false
        if (data.body.meta.count === 0) {
          this.error = 'No user exists'
        } else {
          this.user = data.body.data[0]
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
</style>
