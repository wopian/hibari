<template>
  <footer>
    <div>
      <a v-for='lang in languages' @click='Select(lang.code)'>{{ lang.name }}</a>
    </div>
  </footer>
</template>

<script>
  export default {
    data () {
      return {
        lang: this.$lang,
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
        Select: newLang => {
          console.log('[APP] Changed language to ' + newLang)
          Vue.config.lang = newLang
          this.$cookie.set('lang', newLang)
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
