<template>
  <div class="anime">
    <h1>Anime</h1>

    <div class='loading' v-if='loading'>
      Loading...
    </div>

    <div class='error' v-if='error'>
      {{ error }}
    </div>

    <div class='content' v-if='anime'>
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

      <!--<img v-bind:src='anime.attr.posterImage.small'>
      <img v-bind:src='anime.attr.coverImage.small'>-->
    </div>
  </div>
</template>

<script>
export default {
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
    fetchData: function() {
      this.error = this.user = null
      this.loading = true

      this.$http.get('https://kitsu.io/api/edge/anime?filter[slug]=' + this.$route.params.slug, {}, {
        headers: {
          "Content-Type": "application/vnd.api+json",
          "Accept": "application/vnd.api+json"
        }
      })
      .then((data) => {
        this.loading = false
        if (data.body.meta.count === 0) {
          this.error = 'Anime doesn\'t exist'
        } else {
          this.anime = data.body.data[0]
          this.anime.attr = this.anime.attributes
          delete this.anime.attributes
          delete this.anime.relationships
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
