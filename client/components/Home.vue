<template lang='pug'>
  main.home
    section.user
      div
        p {{ $t('home.user.head') }}
        p {{ $t('home.user.body', { username: slugify(userInput) || 'a user' }) }}
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
  export default {
    metaInfo: {
      titleTemplate: 'Hibari - Stats for Kitsu'
    },
    data () {
      return {
        userInput: '',
        animeInput: '',
        mangaInput: ''
      }
    },
    methods: {
      slugify: input => input.trim().replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '').toLowerCase()
    }
  }
</script>

<style lang='sass'>
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
        @extend .text-center

      p:first-of-type
        @extend .display-3

      p:last-of-type
        @extend .lead

      input
        @extend .form-control
        @extend .form-control-lg
        @extend .col-lg-4
        @extend .col-sm-6
        @extend .offset-lg-4
        @extend .offset-sm-3
        @extend .text-center
        background: rgba($white, .1)
        color: $white
        border-radius: 0
        border-color: transparent

        &::-webkit-input-placeholder
          color: rgba($white, .4)
          font-weight: 300

      a
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

    .user
      background-color: $primary
      position: relative
      color: $white
      height: 400px
      > div
        margin-top: 56px
        @include media-breakpoint-up(sm)
          margin-top: 28px
</style>
