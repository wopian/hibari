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
        p {{ $t('home.manga.body', { username: slugify(mangaInput) || 'a manga' }) }}
        input(v-model='mangaInput' v-bind:placeholder='$t("home.manga.placeholder")' type='text')
        router-link(:to='"/manga/" + slugify(mangaInput)') {{ $t('home.manga.action') }}
</template>

<script>
  export default {
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
  @import ~bootstrap/scss/bootstrap
  @import ~assets/variables

  main.home
    section
      @extend .jumbotron
      border-radius: 0
      height: 400px
      margin-bottom: 0
      font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif

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
        background: rgba(white, .1)
        color: white
        border-radius: 0
        border-color: transparent

        &::-webkit-input-placeholder
          color: rgba(white, .4)
          font-weight: 300
          font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif

      a
        @extend .btn
        @extend .btn-lg
        margin-top: 1rem
        border-radius: 0
        border: 1px solid rgba(white, .1)
        color: white
        font-weight: 300

        &:hover
          background: rgba(white, .1)
          border-color: transparent

    .user
      background-color: $primary
      position: relative
      color: white
      height: 456px
      margin-top: -56px
      > div
        margin-top: calc(56px / 2)
</style>
