<template>
  <main class='home'>
    <set-title :title='"Hibari"'></set-title>

    <section user>
      <div>
        <p>{{ $t('home.user.head') }}</p>
        <p>{{ $t('home.user.body', { username: (slugify(userInput)) || 'a user' }) }}</p>
        <input v-model='userInput' type='text' :placeholder='$t("home.user.placeholder")'>
        <router-link :to='"/@" + slugify(userInput)'>{{ $t('home.user.action') }}</router-link>
      </div>
    </section>

    <div class='card-deck container'>
      <div class='card card-outline-primary mb-3 text-center'>
        <div class='card-block'>
          <h3 class='card-title'>{{ $t('home.anime.head') }}</h3>
          <input v-model='animeInput' class='form-control form-control-lg' type='text' placeholder='Cowboy Bebop'>
          <router-link :to='"/anime/" + slugify(animeInput)' class='btn btn-block'>{{ $t('home.anime.action') }}</router-link>
        </div>
      </div>

      <div class='card card-outline-primary mb-3 text-center'>
        <div class='card-block'>
          <h3 class='card-title'>{{ $t('home.user.head') }}</h3>
          <input v-model='userInput' class='form-control form-control-lg' type='text' placeholder='wopian'>
          <router-link :to='"/@" + slugify(userInput)' class='btn btn-block'>{{ $t('home.user.action') }}</router-link>
        </div>
      </div>

      <div class='card card-outline-primary mb-3 text-center'>
        <div class='card-block'>
          <h3 class='card-title'>{{ $t('home.manga.head') }}</h3>
          <input v-model='mangaInput' class='form-control form-control-lg' type='text' placeholder='Shikabane Cherry'>
          <router-link :to='"/manga/" + slugify(mangaInput)' class='btn btn-block'>{{ $t('home.manga.action') }}</router-link>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import SetTitle from 'components/SetTitle'

export default {
  components: {
    SetTitle
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

<style lang='scss'>
  @import '~styles/main.scss';

  main.home {
    section {
      @extend .jumbotron;
      border-radius: 0;
      height: 400px;

      div {
        @extend .container;
        @extend .text-center;
      }

      p:first-of-type {
        @extend .display-3;
      }

      p:last-of-type {
        @extend .lead;
      }

      input {
        @extend .form-control;
        @extend .form-control-lg;
        @extend .col-lg-4;
        @extend .col-sm-6;
        @extend .offset-lg-4;
        @extend .offset-sm-3;
        @extend .text-center;
      }

      a {
        @extend .btn;
        @extend .btn-lg;
        margin-top: 1rem;

        &:hover {
          background: darken($primary, 5);
          border-color: darken($primary, 2);
        }
      }
    }

    section[user] {
      background-image: url(/background.jpg);
      background-color: #017783;
      background-size: auto 95%;
      background-repeat: no-repeat;
      position: relative;
      color: white;

      @media (min-width: 1501px) {
        background-position: 75% bottom;
      }
      @media (min-width: 921px) and (max-width: 1500px) {
        background-position: 88% bottom;
      }

      @media (max-width: 920px) {
        background-position: 0;
        background-image: none;
      }

      &:before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        //background: rgba(black, .2);
      }

      input {
        background: rgba(white, .1);
        color: white;
        border-radius: 0;
        border-color: transparent;

        &::-webkit-input-placeholder {
          color: rgba(white, .4);
          font-weight: 300;
          font-family:
            -apple-system,
            system-ui,
            BlinkMacSystemFont,
            "Segoe UI",
            Roboto,
            "Helvetica Neue",
            Arial,
            sans-serif;
        }
      }

      a {
        border-radius: 0;
        border: 1px solid rgba(white, .1);
        color: white;
        font-weight: 300;

        &:hover {
          background: rgba(white, .1);
          border-color: transparent;
        }
      }
    }
  }
</style>
