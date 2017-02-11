<template lang='pug'>
  main.no-container.anime
    set-title(v-bind:title='titleCase(this.$route.params.query.replace(/-/g, " "))')

    spinner(v-if='loading')

    section.content(v-if='anime')
      set-title(v-bind:title='anime.attr.canonicalTitle')

      h1 Anime
      pre {{ anime }}

    .error(v-if='error') {{ error }}
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
      error: null,
      titleCase: (str, glue) => {
        glue = (glue) ? glue : ['of', 'for', 'and', 'no']
        return String(str.replace(/(\w)(\w*)/g, function (_, i, r) {
          const j = i.toUpperCase() + (r != null ? r : "")
          return (glue.indexOf(j.toLowerCase())<0)?j:j.toLowerCase();
        }))
      }
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
