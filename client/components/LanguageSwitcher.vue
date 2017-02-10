<template>
  <div switcher>
    <button v-for='lang in languages' @click='Select(lang.code)'>{{ lang.code }}</button>
  </div>
</template>

<script>
  import Vue from 'vue'
  export default {
    data () {
      return {
        lang: Vue.config.lang,
        languages: [
          {
            code: 'EN',
          },
          {
            code: 'JA',
          }
        ],
        Select: langNew => {
          console.info('[APP] Set language to ' + langNew)
          Vue.config.lang = langNew.toLowerCase()
          this.$cookie.set('lang', langNew.toLowerCase())
        }
      }
    },
    components: {
      language: {
        props: ['code']
      }
    }
  }
</script>

<style lang='scss'>
  @import '../styles/main.scss';

  div[switcher] {
    @extend .nav;
    justify-content: flex-end;
    flex: 1 1 auto;

    // Fix misalignment
    position: relative;
    top: 2px;
    // .

    button{
      flex: 0 1 auto;
      @extend .nav-link;
      cursor: pointer;
      color: black;
      background: transparent;
      border: 0;
      padding: 0.5em .5rem;
      font-size: .75rem;
      &:hover {
        color: $primary;
      }
    }
  }
</style>
