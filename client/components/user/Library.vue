<template lang='pug'>
  section.container

    .controls
      //- TODO: Add dropdown to select anime/manga
        button.btn.btn-secondary {{ capitalise(kind) }} Library
      .btn-group(style='float: left')
        button.btn.btn-secondary(
          v-on:click='changeKind("anime")'
          v-bind:class='{ active: kind === "anime" }'
        ) {{ $t('user.library.toggle.anime') }}
        button.btn.btn-secondary(
          v-on:click='changeKind("manga")'
          v-bind:class='{ active: kind === "manga" }'
        ) {{ $t('user.library.toggle.manga') }}

      .btn-group
        button.btn.btn-secondary(
          v-on:click='changeStatus("1,2,3,4,5")'
          v-bind:class='{ active: status === "1,2,3,4,5" }'
        ) {{ $t('user.library.status.' + kind + '.all') }}
        button.btn.btn-secondary(
          v-on:click='changeStatus("1")'
          v-bind:class='{ active: status === "1" }'
        ) {{ $t('user.library.status.' + kind + '.current') }}
        button.btn.btn-secondary(
          v-on:click='changeStatus("2")'
          v-bind:class='{ active: status === "2" }'
        ) {{ $t('user.library.status.' + kind + '.planned') }}
        button.btn.btn-secondary(
          v-on:click='changeStatus("3")'
          v-bind:class='{ active: status === "3" }'
        ) {{ $t('user.library.status.' + kind + '.completed') }}
        button.btn.btn-secondary(
          v-on:click='changeStatus("4")'
          v-bind:class='{ active: status === "4" }'
        ) {{ $t('user.library.status.' + kind + '.on_hold') }}
        button.btn.btn-secondary(
          v-on:click='changeStatus("5")'
          v-bind:class='{ active: status === "5" }'
        ) {{ $t('user.library.status.' + kind + '.dropped') }}

    //- TODO: Re-implement infinite scrolling
      .row(
        v-infinite-scroll='loadMore'
        infinite-scroll-disabled='error'
        infinite-scroll-distance='10'
      )

    .row
      droppler.col-6.col-sm-3.col-lg-2(
        v-for='(media, index) in library'
        v-bind:key='media.id'
        openOn='hover'
        classes='media-tooltip'
        constrainToWindow='true'
        constrainToScrollParent='true'
        remove='true'
        position='right center'
      )
        router-link.card(
          slot='drop-trigger'
          v-bind:to='"/" + kind + "/" + media.media.slug'
        )
          img.card-img-top(:src='media.media.posterImage.medium')

          //- TODO: Replace this component with Tether
            http://tether.io/docs/welcome/
            http://github.hubspot.com/drop/docs/welcome/
            http://github.hubspot.com/select/docs/welcome/
            http://github.hubspot.com/tooltip/docs/welcome/

        .media-box(slot='drop-content')
          .media-title {{ media.media.canonicalTitle }}
          .media-rating(v-if='media.media.averageRating') {{ media.media.averageRating }}%
          .media-synopsis {{ media.media.synopsis }}
          .library
            .library-status {{ $t('user.library.status.' + kind + '.' + media.status) }}
            .library-progress {{ $t('user.library.mediaBox.episode', { episode: media.progress, episodeCount: media.media.episodeCount || media.media.chapterCount || '∞' }) }}
            .library-rating(v-if='media.ratingTwenty') {{ $t('user.library.mediaBox.rating', { rating: media.ratingTwenty / 2 }) }}
            .library-rating(v-else) Unrated
            .library-updated {{ humanise(media.updatedAt) }}

    p(v-if='loading && error === null') Fetching library entries...
    p(v-if='error') {{ error }}
</template>

<script>
  import Droppler from 'vue-droppler'
  import moment from 'moment'
  import { Kitsu } from 'api'

  Kitsu.define('anime', {
    slug: '',
    titles: '',
    canonicalTitle: '',
    averageRating: '',
    ageRating: '',
    subtype: '',
    posterImage: '',
    episodeCount: '',
    synopsis: ''
  }, { collectionPath: 'anime' })

  Kitsu.define('manga', {
    slug: '',
    titles: '',
    canonicalTitle: '',
    averageRating: '',
    ageRating: '',
    subtype: '',
    posterImage: '',
    chapterCount: '',
    synopsis: ''
  }, { collectionPath: 'manga' })

  Kitsu.define('libraryEntry', {
    status: '',
    progress: '',
    rating: '',
    ratingTwenty: '',
    updatedAt: '',
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
    components: {
      Droppler
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
      humanise: function (time) {
        return this.capitalise(moment(time).fromNow())
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

    .btn
      font-size: .75rem
      border-color: #eee
      padding: 10px 15px
      cursor: pointer

    .active
      background: #f6f6f6
      border-color: #eee
      cursor: default

    .btn-group
      float: right
</style>

<style lang='sass'>
  @import ~assets/variables

  // Tether tooltip
  .drop.media-tooltip
    z-index: 50
    pointer-events: none
    @media (max-width: 768px)
      display: none
      visibility: hidden
    > div
      background-color: $primary
      color: lighten($primary, 60)
      border-radius: 3px
      padding: .75rem 1rem 1rem
      position: relative
      height: 189px
      width: 282px
      @media (min-width: 1221px)
        height: 249px
        width: 366px
      @media (max-width: 1220px)
        height: 206px
        width: 306px
      @media (max-width: 990px)
        height: 236px
        width: 348px
      &:before,
      &:after
        width: 0
        height: 0
        content: ''
        border-top: 10px solid transparent
        border-bottom: 10px solid transparent
        position: absolute
        top: .9rem
    .drop-content
      > div
        height: 100%
    .media-box
      display: flex
      flex-direction: column
      flex-wrap: nowrap
      justify-content: flex-start
      align-content: stretch
      align-items: stretch
      height: 100%
    .media-title,
    .media-rating,
    .library
      flex: 0 1 auto
      align-self: auto
    .media-title
      font-size: 1rem
      font-weight: 500
    .media-rating
      margin: 1px 0 5px
      height: 24px
    .media-synopsis
      font-size: .75rem
      // max-height: calc(12px * 5 * 1.5)
      overflow: hidden
      flex: 1 1 auto
      align-self: auto
    .library
      border-top: 1px solid lighten($primary, 4)
      border-radius: 0 0 3px 3px
      background: lighten($primary, 1)
      padding-top: .5rem
      padding-left: 1rem
      padding-right: 1rem
      padding-bottom: 2.25rem
      margin-top: .5rem
      margin-bottom: calc(-1rem + 1px)
      width: calc(100% + 2rem - 2px)
      left: calc(-1rem + 1px)
      position: relative
      height: 2rem
      min-height: 2rem
      max-height: 2rem
      font-size: .75rem
      line-height: 1.5rem

      display: flex
      flex-direction: row
      flex-wrap: nowrap
      justify-content: space-between
      align-content: stretch
      align-items: stretch

      @media (max-width: 1220px)
        flex-wrap: wrap
        height: 4.25rem
        min-height: 4.25rem
        max-height: 4.25rem
        margin-top: .75rem
    .library-status,
    .library-rating,
    .library-progress
      flex: 0 1 auto
      align-self: auto
      @media (max-width: 1220px)
        flex: 1 1 60%
    @media (max-width: 1220px)
      .library-status
        order: 4
        text-align: right
        flex: 1 1 40%
      .library-updated
        order: -1
        text-align: right
      .library-progress
        order: -3
    &.drop-target-attached-right
      > div
        left: 16px
        &:before
          left: -10px
          border-right: 10px solid $primary
    &.drop-target-attached-left
      > div
        right: 16px
        &:after
          right: -10px
          border-left: 10px solid $primary
        @media (max-width: 990px)
          left: -16px
</style>
