<template>
  <main class='home'>
    <div class='jumbotron'>
      <div class='container text-center'>
      <h1 class='display-3'>User</h1>
      <p class='lead'>Something about getting user stats</p>
      <input v-model='userInput' class='form-control form-control-lg col-lg-4 col-sm-6 offset-lg-4 offset-sm-3 text-center' type='text' placeholder='wopian'>
      <router-link :to='"/@" + slugify(userInput)' class='btn btn-lg mt-4 btn-primary'>Lookup</router-link>
      </div>
    </div>

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
