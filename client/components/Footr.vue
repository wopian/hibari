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
    data () {
      return {
        lang: Vue.config.lang,
        languages: [
          {
            code: 'en',
            name: 'English'
          },
          {
            code: 'ja',
            name: '日本語'
          }
        ],
        Select: langNew => {
          console.info('[APP] Set language to ' + langNew)
          Vue.config.lang = langNew
          this.$cookie.set('lang', langNew)
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
