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

    .row(v-if='$store.state.user[$route.params.slug] && libraryDownloaded[kind]')
      droppler.col-6.col-sm-3.col-lg-2(
        v-for='(entry, index) in $store.state.user[$route.params.slug].library[kind]'
        v-bind:key='entry[kind].slug'
        openOn='hover'
        classes='media-tooltip'
        constrainToWindow='true'
        constrainToScrollParent='true'
        remove='true'
        position='right center'
      )
        router-link.card(
          slot='drop-trigger'
          v-bind:to='"/" + kind + "/" + entry[kind].slug'
        )
          img.card-img-top(:src='entry[kind].posterImage')

          //- TODO: Replace this component with Tether
            http://tether.io/docs/welcome/
            http://github.hubspot.com/drop/docs/welcome/
            http://github.hubspot.com/select/docs/welcome/
            http://github.hubspot.com/tooltip/docs/welcome/

        .media-box(slot='drop-content')
          .media-title {{ entry[kind].canonicalTitle }}
          .media-rating(
            v-if='entry[kind].averageRating'
            v-bind:class='colourAverageRating(entry[kind].averageRating)'
          ) {{ entry[kind].averageRating }}%
          .media-synopsis {{ entry[kind].synopsis }}
          .library
            .library-status {{ $t('user.library.status.' + kind + '.' + entry.status) }}
            .library-progress(v-if='kind === "anime"') {{ $t('user.library.mediaBox.episode', { episode: entry.progress, total: entry[kind].episodeCount || '∞' }) }}
            .library-progress(v-if='kind === "manga"') {{ $t('user.library.mediaBox.chapter', { chapter: entry.progress, total: entry[kind].chapterCount || '∞' }) }}
            .library-rating(v-if='entry.ratingTwenty') {{ $t('user.library.mediaBox.rating', { rating: entry.ratingTwenty / 2 }) }}
            .library-rating(v-else) Unrated
            .library-updated {{ humanise(entry.updatedAt) }}

    p(v-if='error') {{ error }}
</template>

<script>
  import Droppler from 'vue-droppler'
  import Spinner from 'components/util/Loader'
  import libraryEntryMixin from 'util/libraryEntryMixin'

  export default {
    mixins: [libraryEntryMixin],
    metaInfo: {
      title: 'Library'
    },
    components: {
      Droppler,
      Spinner
    },
    props: [
      'slug',
      'profile',
      'libraryDownloaded'
    ],
    data () {
      return {
        error: undefined,
        kind: 'anime', // current library type (anime|manga)
        status: '', // current status type (''=all,current,completed,planned,on_hold,dropped)
        library: []
      }
    },
    methods: {
      changeKind: function (kind) {
        if (kind !== this.kind) {
          this.kind = kind
        }
      },
      changeStatus: function (status) {
        if (status !== this.status) {
          this.status = status
        }
      }
    }
  }
</script>

<style lang='sass' scoped>
  @import ~styles/variables

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
