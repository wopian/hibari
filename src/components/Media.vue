<template lang='pug'>
  main
    img.banner(:src='coverImage')
    .container
      .media
        figure.media-left
          img.poster(:src='posterImage')
        .media-content
          h1.title {{ canonicalTitle }}
          h2.subtitle {{ otherTitle }}

    pre {{ response }}
</template>

<script>
  import api from '@/api'

  export default {
    data () {
      return {
        canonicalTitle: null,
        otherTitle: null,
        coverImage: null,
        posterImage: null,
        response: null
      }
    },
    created () {
      this.getMedia()
    },
    methods: {
      async getMedia () {
        const type = this.$store.state.route.meta.type
        const slug = this.$store.state.route.params.slug
        let { data } = await api.get(type, {
          filter: { slug }
        })

        data = data[0]

        this.response = data
        this.canonicalTitle = data.canonicalTitle
        this.coverImage = data.coverImage.large
        this.posterImage = data.posterImage.small
      }
    },
    meta () {
      return {
        title: this.canonicalTitle
      }
    }
  }
</script>

<style lang='sass' scoped>
  .banner
    width: 100vw
    min-height: 45vh
    max-height: 45vh
    object-fit: cover
    object-position: top
    margin-top: -52px
    pointer-events: none

  .poster
    width: 14rem
    margin-top: -15rem
    border-radius: .25rem
</style>
