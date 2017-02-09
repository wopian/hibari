<template>
  <main class='home'>

    <section endpoint='user'>
      <div>
        <p>User</p>
        <p>Something about getting user stats</p>
        <input v-model='userInput' type='text' placeholder='wopian'>
        <router-link :to='"/@" + slugify(userInput)'>Lookup</router-link>
      </div>
    </section>

    <div class='card-deck container'>
      <div class='card card-outline-primary mb-3 text-center'>
        <div class='card-block'>
          <h3 class='card-title'>{{ $t('home.animeStats') }}</h3>
          <input v-model='animeInput' class='form-control form-control-lg' type='text' placeholder='Cowboy Bebop'>
          <router-link :to='"/anime/" + slugify(animeInput)' class='btn btn-block'>Lookup</router-link>
        </div>
      </div>

      <div class='card card-outline-primary mb-3 text-center'>
        <div class='card-block'>
          <h3 class='card-title'>{{ $t('home.userStats') }}</h3>
          <input v-model='userInput' class='form-control form-control-lg' type='text' placeholder='wopian'>
          <router-link :to='"/@" + slugify(userInput)' class='btn btn-block'>Lookup</router-link>
        </div>
      </div>

      <div class='card card-outline-primary mb-3 text-center'>
        <div class='card-block'>
          <h3 class='card-title'>{{ $t('home.mangaStats') }}</h3>
          <input v-model='mangaInput' class='form-control form-control-lg' type='text' placeholder='Shikabane Cherry'>
          <router-link :to='"/manga/" + slugify(mangaInput)' class='btn btn-block'>Lookup</router-link>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  components: {
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

  section[endpoint] {
    @extend .jumbotron;
    border-radius: 0;

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
      @extend .btn-primary;
      margin-top: 1rem;
      background: $primary;
      border-color: $primary;

      &:hover {
        background: darken($primary, 5);
        border-color: darken($primary, 2);
      }
    }
  }
</style>
