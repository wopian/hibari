<template lang='pug'>
  section.profile(v-if='user')
    div
      .left
        h1 {{ user.attributes.name }}
      .right
        p.waifu(v-if='waifu') {{ waifu[0].attributes.name }}
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

  section.profile
    @extend .container
    margin-top: 1rem

    > div:first-of-type
      @extend .row

    .left, .right
      @extend .col

    @include media-breakpoint-up(md)
      .right
        text-align: right

    h1, .waifu
      @extend .display-4

      span
        display: block
        padding-top: .5rem
        font-size: 1.5rem
</style>
