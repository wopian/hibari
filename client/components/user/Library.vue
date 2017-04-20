<template lang='pug'>
  section.container

    .controls
      //- TODO: Add dropdown to select anime/manga
        button.btn.btn-secondary {{ capitalise(kind) }} Library
      .btn-group(style='float: left')
        button.btn.btn-secondary(
          v-on:click='changeKind("anime")'
          v-bind:class='{ active: kind === "anime" }'
        ) Anime Library
        button.btn.btn-secondary(
          v-on:click='changeKind("manga")'
          v-bind:class='{ active: kind === "manga" }'
        ) Manga Library

      .btn-group
        button.btn.btn-secondary(
          v-on:click='changeStatus("1,2,3,4,5")'
          v-bind:class='{ active: status === "1,2,3,4,5" }'
        ) All {{ capitalise(kind) }}
        button.btn.btn-secondary(
          v-on:click='changeStatus("1")'
          v-bind:class='{ active: status === "1" }'
        ) Currently Watching
        button.btn.btn-secondary(
          v-on:click='changeStatus("2")'
          v-bind:class='{ active: status === "2" }'
        ) Plan to Watch
        button.btn.btn-secondary(
          v-on:click='changeStatus("3")'
          v-bind:class='{ active: status === "3" }'
        ) Completed
        button.btn.btn-secondary(
          v-on:click='changeStatus("4")'
          v-bind:class='{ active: status === "4" }'
        ) On Hold
        button.btn.btn-secondary(
          v-on:click='changeStatus("5")'
          v-bind:class='{ active: status === "5" }'
        ) Dropped

    //- TODO: Re-implement infinite scrolling
      .row(
        v-infinite-scroll='loadMore'
        infinite-scroll-disabled='error'
        infinite-scroll-distance='10'
      )

    .row
      .col-6.col-sm-3.col-lg-2(v-for='(media, index) in library')
        router-link.card(:to='"/" + kind + "/" + media.media.slug')
          img.card-img-top(:src='media.media.posterImage.medium')

          //- TODO: Replace this component with Tether
            http://tether.io/docs/welcome/
            http://github.hubspot.com/drop/docs/welcome/
            http://github.hubspot.com/select/docs/welcome/
            http://github.hubspot.com/tooltip/docs/welcome/

          .card-block
            p.card-text {{ media.media.canonicalTitle }}
            p.card-text {{ media.media.averageRating }}
            p.card-text {{ media.status }}
            p.card-text {{ media.progress }} / {{ media.media.episodeCount || media.media.chapterCount }}
            p.card-text(v-if='media.ratingTwenty') {{ media.ratingTwenty / 2 }} / 10

    p(v-if='loading && error === null') Fetching library entries...
    p(v-if='error') {{ error }}
</template>

<script>
  import { Kitsu } from 'api'

  Kitsu.define('anime', {
    slug: '',
    titles: '',
    canonicalTitle: '',
    averageRating: '',
    ageRating: '',
    subtype: '',
    posterImage: '',
    episodeCount: ''
  }, { collectionPath: 'anime' })

  Kitsu.define('manga', {
    slug: '',
    titles: '',
    canonicalTitle: '',
    averageRating: '',
    ageRating: '',
    subtype: '',
    posterImage: '',
    chapterCount: ''
  }, { collectionPath: 'manga' })

  Kitsu.define('libraryEntry', {
    status: '',
    progress: '',
    rating: '',
    ratingTwenty: '',
    media: {
      jsonApi: 'hasOne',
      type: 'anime' | 'manga'
    }
  }, { collectionPath: 'library-entries' })

  let offset = 0

  export default {
    metaInfo: {
      title: 'Library'
    },
    props: [
      'slug',
      'user'
    ],
    data () {
      return {
        loading: false,
        error: undefined,
        loadingError: this.error || this.loading === true,
        kind: 'anime', // current library type (anime|manga)
        status: '1,2,3,4,5', // current status type (1=current)
        library: []
      }
    },
    created () {
      this.loadMore()
    },
    methods: {
      capitalise: function (string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
      },
      loadMore: function () {
        this.loading = true
        this.getLibraryEntries(200) // 48
        this.loading = false
      },
      changeKind: function (kind) {
        if (kind !== this.kind) {
          this.library = []
          this.kind = kind
          this.error = undefined
          offset = 0
          this.loadMore()
        }
      },
      changeStatus: function (status) {
        if (status !== this.status) {
          this.library = []
          this.status = status
          this.error = undefined
          offset = 0
          this.loadMore()
        }
      },
      getLibraryEntries: async function (limit) {
        let response = await Kitsu.findAll('libraryEntry', {
          filter: {
            userId: this.user.id,
            kind: this.kind,
            status: this.status
          },
          include: 'media',
          sort: '-updated_at',
          page: {
            limit,
            offset
          }
        })

        delete response.links
        delete response.meta

        console.log(response)

        if (response.length !== 0) {
          for (let media of response) {
            this.library.push(media)
          }
          offset += limit
        } else {
          this.error = 'No media found'
        }
      }
    }
  }
</script>

<style lang='sass' scoped>
  @import ~bootstrap/scss/variables
  @import ~bootstrap/scss/mixins/breakpoints
  @import ~assets/variables

  section
    padding-top: 1rem

  img
    width: 100%
    // border-radius: 3px

  p
    font-size: .75rem

  .row
    margin-right: -20px
    margin-left: -20px

    .card-block
      display: none
      p:nth-child(1)
        font-size: 1rem
        font-weight: 700

    img:hover + .card-block
      display: block
      position: absolute
      left: calc(100% + 20px - (7.5px / 2) + 1px)
      z-index: 2
      background: $primary
      color: $white
      width: 100%
      height: 100%
      border-radius: 3px
      @include media-breakpoint-up(sm)
        width: calc(200% + 20px)

  .col-6.col-sm-3.col-lg-2
    padding-left: 7.5px
    padding-right: 7.5px
    padding-bottom: 7.5px * 2

  .controls
    margin-right: -20px + 7.5px
    margin-left: -20px + 7.5px
    margin-bottom: 1rem
    display: inline-block
    width: calc(100% + 20px + (7.5px / 2))

    .btn-secondary
      color: #373a3c
      background-color: $purewhite
      &:hover:not(.active)
        background: $white
        border-color: #eee

    .active
      background: #f6f6f6
      border-color: #eee

    .btn
      font-size: .75rem
      border-color: #eee
      padding: 10px 15px

    .btn-group
      float: right
</style>
