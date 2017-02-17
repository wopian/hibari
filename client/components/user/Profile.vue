<template lang='pug'>
  section.profile(v-if='user')
    div
      .left
        .title
          span Sociability
        .sociability
          .card
            p {{ user.attributes.postsCount }}
            p Posts
          .card
            p {{ user.attributes.commentsCount }}
            p Comments
          .card
            p {{ user.attributes.likesGivenCount }}
            p Likes Given
          .card
            p {{ user.attributes.likesReceivedCount }}
            p Likes Received
          .card
            p {{ user.attributes.followingCount }}
            p Followed
          .card
            p {{ user.attributes.followersCount }}
            p Followers
      .right
        .title
          span About
        p.os {{ user.attributes.about }}
        p.waifu(v-if='waifu') {{ waifu.attributes.name }}
          span {{ user.attributes.waifuOrHusbando }}

    .container
      hr
      p User
      pre(v-if='user') {{ user }}

      hr
      p Waifu
      pre(v-if='waifu') {{ waifu }}

      hr
      p Pinned Post
      pre(v-if='pinned') {{ pinned }}

      hr
      p Profile Links
      pre(v-if='profileLinks') {{ profileLinks }}

      hr
      p Favourites
      pre(v-if='favourites') {{ favourites }}
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

  .title
    display: block
    overflow: hidden
    white-space: nowrap
    text-align: center
    margin-bottom: 15px

    span
      position: relative
      display: inline-block

      &:before,
      &:after
        content: ''
        position: absolute
        top: 50%
        width: 100vw
        height: 1px
        background: rgba($primary, .1)

      &:before
        right: 100%
        margin-right: 1rem

      &:after
        left: 100%
        margin-left: 1rem

  section.profile
    @extend .container
    padding: 0
    margin-top: 15px

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
      box-shadow: 0 1px 4px rgba(black, .04)
      border: 1px solid rgba(black, .09)
      margin: 0 15px 30px
      min-width: 10rem
      p:first-of-type
        @extend .card-title
        font-size: 2rem
        margin-bottom: 0
      p:last-of-type
        @extend .card-text
</style>
