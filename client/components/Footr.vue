<template>
  <footer>
    <div>
      <a v-for='lang in languages' @click='Select(lang.code)'>{{ lang.name }}</a>
    </div>
  </footer>
</template>

<script>
import Vue from 'vue'
export default {
  data() {
    return {
      lang: Vue.config.lang,
      languages: [
        {
          code: 'en',
          name: 'English'
        },
        {
          code: 'ja',
          name: 'Japanese'
        },
      ],
      Select: change => {
        console.log('code ' + change)
        Vue.config.lang = change
      }
    }
  },
  components: {
    language: {
      props: ['code', 'name']
    }
  }
}
</script>
