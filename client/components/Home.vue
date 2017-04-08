<template lang='pug'>
  main
    //- User lookup
    .jumbotron
      .container
        .row
          .col-sm-7
            h1 {{ $t('home.strapline')}}
              a(href='//kitsu.io')
                strong Kitsu
            p.lead Extended stats for users, anime and manga.
          .col-sm-5
            //- p {{ $t('home.user.body', { username: slugify(userInput) || 'a user' }) }}
            input.form-control.form-control-lg(v-model='userInput' v-bind:placeholder='$t("home.user.placeholder")' type='text')
            router-link.btn.btn-lg.btn-block(:to='"/@" + slugify(userInput)') {{ $t('home.user.action') }}

    //- Anime lookup
    .jumbotron
      .container
        .row
          .col-sm-7
            h2 {{ $t('home.anime.head') }}
            p.lead {{ $t('home.anime.body', { anime: slugify(animeInput) || 'an anime' }) }}
          .col-sm-5
            input.form-control.form-control-lg(v-model='animeInput' v-bind:placeholder='$t("home.anime.placeholder")' type='text')
            router-link.btn.btn-lg.btn-block(:to='"/anime/" + slugify(animeInput)') {{ $t('home.anime.action') }}

    .jumbotron
      .container
        .row
          .col-sm-7
            h2 {{ $t('home.manga.head') }}
            p.lead {{ $t('home.manga.body', { manga: slugify(mangaInput) || 'a manga' }) }}
          .col-sm-5
            input.form-control.form-control-lg(v-model='mangaInput' v-bind:placeholder='$t("home.manga.placeholder")' type='text')
            router-link.btn.btn-lg.btn-block(:to='"/manga/" + slugify(mangaInput)') {{ $t('home.manga.action') }}
</template>

<script>
  export default {
    metaInfo () {
      return {
        titleTemplate: `${this.$t('hibari')} - ${this.$t('strapline')}`
      }
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

<style lang='sass' scoped>
  @import ~assets/variables

  h1
    font-size: 3rem
  input
    background: rgba($primary, .2)
    color: $black
    border-radius: 0
    border-color: transparent
    &::-webkit-input-placeholder
      color: rgba($black, .6)
      font-weight: 300

  .jumbotron
    border-radius: 0
    height: 400px
    margin-bottom: 0
    background-color: $white
    position: relative

    > .container
      height: 100%

    .row
      padding: 0
      height: 100%
      align-items: center

      div:nth-child(1)
        padding: 0
        a
          text-decoration: none
          border-bottom: 2px solid rgba($kitsu, .8)
          transition: color 100ms ease-out
          &:hover
            color: rgba($kitsu, .8)
            transition: color 100ms ease-in-out

      div:nth-child(2)
        padding: 0
        display: flex
        flex-direction: column
        align-items: flex-end
        a
          margin-top: 1rem
          border-radius: 0
          border: 1px solid rgba($primary, .2)
          color: $black
          &:hover
            background: rgba($primary, .2)
            border-color: transparent

    &:first-of-type
      background-color: $primary
      color: $white
      p
        color: rgba($white, .7)
      a
        color: $white
      div:nth-child(2)
        a
          border: 1px solid rgba($white, .1)
          color: $white
          &:hover
            background: rgba($white, .1)
        input
          background: rgba($white, .1)
          color: $white
          &::-webkit-input-placeholder
            color: rgba($white, .4)
</style>
