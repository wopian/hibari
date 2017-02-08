<template>
  <main class='home'>

    <div class='card-deck'>
      <div class='card card-outline-primary mb-3 text-center'>
        <div class='card-block'>
          <h3 class='card-title'>Anime Stats</h3>
          <input v-model='animeInput' class='form-control form-control-lg' type='text' placeholder='Cowboy Bebop'>
          <router-link :to='"/anime/" + slugify(animeInput)' class='btn btn-block'>Lookup</router-link>
        </div>
      </div>

      <div class='card card-outline-primary mb-3 text-center'>
        <div class='card-block'>
          <h3 class='card-title'>User Stats</h3>
          <input v-model='userInput' class='form-control form-control-lg' type='text' placeholder='wopian'>
          <router-link :to='"/@" + slugify(userInput)' class='btn btn-block'>Lookup</router-link>
        </div>
      </div>

      <div class='card card-outline-primary mb-3 text-center'>
        <div class='card-block'>
          <h3 class='card-title'>Manga Stats</h3>
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
    slugify: input => input.replace(/\s+/g, '-').toLowerCase()
  }
}
</script>
