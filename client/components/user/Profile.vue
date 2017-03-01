<template lang='pug'>
  section.profile(v-if='user')
    div
      .left
        .title
          span {{ $t('user.sociability.title') }}
        .sociability
          .card
            p {{ user.attributes.postsCount }}
            p {{ $t('user.sociability.postsCount') }}
          .card
            p {{ user.attributes.commentsCount }}
            p {{ $t('user.sociability.commentsCount') }}
          .card
            p {{ user.attributes.likesGivenCount }}
            p {{ $t('user.sociability.likesGivenCount') }}
          .card
            p {{ user.attributes.likesReceivedCount }}
            p {{ $t('user.sociability.likesReceivedCount') }}
          .card
            p {{ user.attributes.followingCount }}
            p {{ $t('user.sociability.followingCount') }}
          .card
            p {{ user.attributes.followersCount }}
            p {{ $t('user.sociability.followersCount') }}

        .title
          span Recent Activity
        .recent-activity.row
          .col-3(v-for='n in 4')
            img(src='//media.kitsu.io/anime/poster_images/11178/large.jpg?1452886316')

        .title
          span Anime Stats

        .title
          span Manga Stats



        //- RAW API DUMP START
        .title
          span User
        pre(v-if='user') {{ user }}
        .title
          span Waifu
        pre(v-if='waifu') {{ waifu }}
        pre(v-else) User has no waifu
        .title
          span Pinned Post
        pre(v-if='pinned') {{ pinned }}
        pre(v-else) User has no pinned post
        .title
          span Profile Links
        pre(v-if='profileLinks') {{ profileLinks }}
        pre(v-else) User has no profile links
        .title
          span Favourites
        pre(v-if='favourites') {{ favourites }}
        pre(v-else) User has no favourites
        //- RAW API DUMP END

      .right
        .title
          span About Me
        p.os {{ user.attributes.about }}
        p.waifu(v-if='waifu') {{ waifu.attributes.name }}
          span {{ user.attributes.waifuOrHusbando }}
        .favourites(v-if='favourites')
          .title
            span Favourites
          ul.nav.nav-pills.nav-justified
            li.nav-item
              a.nav-link.active Anime
            li.nav-item
              a.nav-link Manga
            li.nav-item
              a.nav-link Characters
          .tab-content
            .tab-pane.active
              .row
                .col-3(v-for='fav in favourites')
                  router-link(:to='"/anime/osomatsu-san"')
                    //- {{ fav.id }}
                    img(src='//media.kitsu.io/anime/poster_images/11178/tiny.jpg?1452886316')
</template>

<script>
  export default {
    metaInfo: {
      title: 'Profile'
    },
    props: [
      'slug',
      'user',
      'waifu',
      'pinned',
      'profileLinks',
      'favourites'
    ],
    data () {
      return {
        loading: false,
        error: null
      }
    }
  }
</script>

<style lang='sass'>
  @import ~bootstrap/scss/bootstrap
  @import ~assets/variables

  section.profile
    @extend .container
    padding: 0
    margin-top: 30px

    > div:first-of-type
      @extend .row

    .left
      @extend .col-md-8
      @extend .col-sm-12

    .right
      @extend .col-md-4
      @extend .col-sm-12
      order: -1
      @include media-breakpoint-up(md)
        order: 1

    .sociability
      @extend .row
      display: flex
      flex-flow: row wrap

    .card
      @extend .card-block
      text-align: center
      box-shadow: 0 1px 4px rgba($black, .04)
      border: 1px solid rgba($black, .09)
      margin: 0 15px 30px
      min-width: 10rem
      p:first-of-type
        @extend .card-title
        font-size: 2rem
        margin-bottom: 0
      p:last-of-type
        @extend .card-text

    .favourites
      a
        font-size: 12px
      .row
        margin: 15px -2px 0
        > div
          padding: 0 3px
        a
          border-radius: 3px
          overflow: hidden
          display: inline-block
      img
        width: 100%
        max-width: 100%
        vertical-align: middle
      ul
        .active
          background: $primary

    .recent-activity
      margin-bottom: 30px
      margin-left: -7.5px
      margin-right: -7.5px
      div
        padding: 0 7.5px
      img
        width: 100%
        max-width: 100%
        vertical-align: middle
        border-radius: 3px
</style>
