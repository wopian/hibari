<template lang='pug'>
  main
    section.jumbotron
      .container
        .row
          .left.col-7
            h1 {{ $t('home.strapline')}}
              a(href='//kitsu.io')
                strong Kitsu
            p.lead Extended stats for users, anime and manga.
          .right.col-5
            //- p {{ $t('home.user.body', { username: slugify(userInput) || 'a user' }) }}
            input.form-control.form-control-lg(v-model='userInput' v-bind:placeholder='$t("home.user.placeholder")' type='text')
            router-link.col-sm-8.btn.btn-lg.col-sm-8(:to='"/@" + slugify(userInput)') {{ $t('home.user.action') }}

    section.jumbotron
      .container
        p.lead {{ $t('home.anime.head') }}
        p.lead {{ $t('home.anime.body', { anime: slugify(animeInput) || 'an anime' }) }}
        input(v-model='animeInput' v-bind:placeholder='$t("home.anime.placeholder")' type='text')
        router-link(:to='"/anime/" + slugify(animeInput)') {{ $t('home.anime.action') }}

    section.jumbotron
      .container
        p.lead {{ $t('home.manga.head') }}
        p.lead {{ $t('home.manga.body', { manga: slugify(mangaInput) || 'a manga' }) }}
        input(v-model='mangaInput' v-bind:placeholder='$t("home.manga.placeholder")' type='text')
        router-link(:to='"/manga/" + slugify(mangaInput)') {{ $t('home.manga.action') }}
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

  section
    border-radius: 0
    height: 400px
    margin-bottom: 0
    background-color: $white
    position: relative
    color: $white
    &:first-of-type
      background-color: $primary
    > .container
      height: 100%
    .row
      padding: 0
      height: 100%
      align-items: center
      div:nth-child(1)
        padding: 0
        p
          color: rgba($white, .7)
        h1 > a
          text-decoration: none
          color: $white
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
          border: 1px solid rgba($white, .1)
          color: $white
          &:hover
            background: rgba($white, .1)
            border-color: transparent
  h1
    font-size: 3rem
  input
    background: rgba($white, .1)
    color: $white
    border-radius: 0
    border-color: transparent
    &::-webkit-input-placeholder
      color: rgba($white, .4)
      font-weight: 300
</style>
