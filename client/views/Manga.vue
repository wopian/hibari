<template>
  <main class='manga'>
    <h1>Manga</h1>

    <spinner v-if='loading'></spinner>

    <div class='error' v-if='error'>
      {{ error }}
    </div>

    <div class='content' v-if='manga'>
      <set-title :title='manga.attr.canonicalTitle + " - Hibari"'></set-title>
      <pre>{{ manga }}</pre>
      <!--<p>{{ $route.params.slug }}</p>

      <pre>
ID: {{ manga.id }}
Slug: {{ manga.attr.slug }}
Synopsis: {{ manga.attr.synopsis }}
English Title: {{ manga.attr.titles.en }}
Canonical Title: {{ manga.attr.canonicalTitle }}
Abbreviations: {{ manga.attr.abbreviatedTitles }}
Rating: {{ manga.attr.averageRating }}
Ratings: {{ manga.attr.ratingFrequencies }}
Favourites: {{ manga.attr.favoritesCount }}
Started Publishing: {{ manga.attr.startDate }}
Finished Publishing: {{ manga.attr.endDate }}
Popularity Rank: {{ manga.attr.popularityRank }}
Rating Rank: {{ manga.attr.ratingRank }}
Age Rating: {{ manga.attr.ageRating }}
Age Guide: {{ manga.attr.ageRatingGuide }}
Chapters: {{ manga.attr.chapterCount }}
Volumes: {{ manga.attr.volumeCount }}
Serialization: {{ manga.attr.serialization }}
Type: {{ manga.attr.subtype }}
NSFW: {{ manga.attr.nsfw }}
      </pre>-->

      <!--<img v-bind:src='manga.attr.posterImage.small'>
      <img v-bind:src='manga.attr.coverImage.small'>-->
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
      manga: null,
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

      this.$http.get('https://kitsu.io/api/edge/manga?page[limit]=1&filter[text]=' + this.$route.params.query, {}, {
        headers: {
          'Content-Type': 'application/vnd.api+json',
          'Accept': 'application/vnd.api+json',
          'User-Agent': 'hibari'
        }
      })
      .then((data) => {
        this.loading = false
        if (data.body.meta.count === 0) {
          this.error = 'Manga doesn\'t exist'
        } else {
          this.manga = data.body.data[0]
          this.manga.attr = this.manga.attributes
          // TODO: https://github.com/vuejs/vue-router/issues/703#issuecomment-256198206
          // this.$router.replace(this.manga.attr.slug)
          history.replaceState({}, null, '/manga/' + this.manga.attr.slug)
          delete this.manga.attributes
          delete this.manga.relationships
          delete this.manga.links
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
