<template>
  <main class='no-container anime'>
    <spinner v-if='loading'></spinner>

    <section class='content' v-if='anime'>
      <set-title :title='anime.attr.canonicalTitle + " - Hibari"'></set-title>
      <h1>Anime</h1>
      <pre>{{ anime }}</pre>
      <!--
      <p>{{ $route.params.slug }}</p>
      <pre>
ID: {{ anime.id }}
Slug: {{ anime.attr.slug }}
Synopsis: {{ anime.attr.synopsis }}
English Title: {{ anime.attr.titles.en }}
Canonical Title: {{ anime.attr.canonicalTitle }}
Abbreviations: {{ anime.attr.abbreviatedTitles }}
Rating: {{ anime.attr.averageRating }}
Ratings: {{ anime.attr.ratingFrequencies }}
Favourites: {{ anime.attr.favoritesCount }}
Started Airing: {{ anime.attr.startDate }}
Finished Airing: {{ anime.attr.endDate }}
Popularity Rank: {{ anime.attr.popularityRank }}
Rating Rank: {{ anime.attr.ratingRank }}
Age Rating: {{ anime.attr.ageRating }}
Age Guide: {{ anime.attr.ageRatingGuide }}
Episodes: {{ anime.attr.episodeCount }}
Length: {{ anime.attr.episodeLength }} minutes
Type: {{ anime.attr.subtype }}
Youtube: https://youtu.be/{{ anime.attr.youtubeVideoId }}
NSFW: {{ anime.attr.nsfw }}
      </pre>
      <pre v-if='anime.attr.posterImage.small'>
Poster: {{ anime.attr.posterImage.small }}
      </pre>
      <pre v-if='anime.attr.coverImage.small'>
Cover: {{ anime.attr.coverImage.small }}
      </pre> -->
      <!--<img v-bind:src='anime.attr.posterImage.small'>
      <img v-bind:src='anime.attr.coverImage.small'>-->
    </section>

    <div class='error' v-if='error'>
      {{ error }}
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
      anime: null,
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
      this.$http.get('https://kitsu.io/api/edge/anime?page[limit]=1&filter[text]=' + this.$route.params.query, {}, {
        headers: {
          'Content-Type': 'application/vnd.api+json',
          'Accept': 'application/vnd.api+json',
          'User-Agent': 'hibari'
        }
      })
      .then((data) => {
        this.loading = false
        if (data.body.meta.count === 0) {
          this.error = 'Anime doesn\'t exist'
        } else {
          this.anime = data.body.data[0]
          this.anime.attr = this.anime.attributes
          // TODO: https://github.com/vuejs/vue-router/issues/703#issuecomment-256198206
          // this.$router.replace(this.anime.attr.slug)
          history.replaceState({}, null, '/anime/' + this.anime.attr.slug)
          delete this.anime.attributes
          delete this.anime.relationships
          delete this.anime.links
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
  section {
    position: relative;
  }
</style>
