<template lang='pug'>
  main.home
    section.user
      div
        .row
          .left
            h1(v-html='$t("home.strapline")')
            p Hibari provides extended stats for users, anime and manga.
            //- span
            //-  kitsu
          .right
            //- p {{ $t('home.user.body', { username: slugify(userInput) || 'a user' }) }}
            input(v-model='userInput' v-bind:placeholder='$t("home.user.placeholder")' type='text')
            router-link(:to='"/@" + slugify(userInput)') {{ $t('home.user.action') }}

    section.anime
      div
        p {{ $t('home.anime.head') }}
        p {{ $t('home.anime.body', { anime: slugify(animeInput) || 'an anime' }) }}
        input(v-model='animeInput' v-bind:placeholder='$t("home.anime.placeholder")' type='text')
        router-link(:to='"/anime/" + slugify(animeInput)') {{ $t('home.anime.action') }}

    section.manga
      div
        p {{ $t('home.manga.head') }}
        p {{ $t('home.manga.body', { manga: slugify(mangaInput) || 'a manga' }) }}
        input(v-model='mangaInput' v-bind:placeholder='$t("home.manga.placeholder")' type='text')
        router-link(:to='"/manga/" + slugify(mangaInput)') {{ $t('home.manga.action') }}
</template>

<script>
  import Kitsu from 'components/util/Kitsu'

  export default {
    metaInfo () {
      return {
        titleTemplate: `${this.$t('hibari')} - ${this.$t('strapline')}`
      }
    },
    components: {
      Kitsu
    },
    data () {
      return {
        userInput: '',
        animeInput: '',
        mangaInput: ''
      }
    },
    methods: {
      slugify: input => input.trim().replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-_]/g, '').toLowerCase()
    }
  }
</script>

<style lang='sass'>
  // TODO: Cleanup styles
  @import ~bootstrap/scss/variables
  @import ~bootstrap/scss/mixins
  @import ~bootstrap/scss/type
  @import ~bootstrap/scss/grid
  @import ~bootstrap/scss/forms
  @import ~bootstrap/scss/buttons
  @import ~bootstrap/scss/jumbotron
  @import ~bootstrap/scss/utilities
  @import ~assets/variables

  main.home
    section
      @extend .jumbotron
      border-radius: 0
      height: 400px
      margin-bottom: 0
      background: $white

      div
        @extend .container
        // @extend .text-center

      p:last-of-type
        @extend .lead

    .user
      background-color: $primary
      position: relative
      color: $white
      height: 400px
      > div
        @extend .container
        height: 100%
      .row
        padding: 0
        height: 100%
      .left
        @extend .col-7
        padding: 0
        font-weight: 300
        align-self: center
        p
          color: rgba($white, .7)
        a
          text-decoration: none
          color: $white
          border-bottom: 2px solid rgba($kitsu, .8)
          transition: color 100ms ease-out
          &:hover
            color: rgba($kitsu, .8)
            transition: color 100ms ease-in-out
      .right
        @extend .col-5
        padding: 0
        display: flex
        flex-direction: column
        align-self: center
        align-items: flex-end
        a
          @extend .col-sm-8
          @extend .btn
          @extend .btn-lg
          margin-top: 1rem
          border-radius: 0
          border: 1px solid rgba($white, .1)
          color: $white
          font-weight: 300
          &:hover
            background: rgba($white, .1)
            border-color: transparent
      h1
        font-size: 3rem
      svg
        height: 6rem
        width: 12rem
      input
        @extend .form-control
        @extend .form-control-lg
        @extend .col-sm-8
        // @extend .text-center
        background: rgba($white, .1)
        color: $white
        border-radius: 0
        border-color: transparent
        &::-webkit-input-placeholder
          color: rgba($white, .4)
          font-weight: 300
</style>
