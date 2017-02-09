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

<style lang='scss'>
  @import '../styles/main.scss';

  footer {
    @extend .navbar;
    height: 54px;
    background: rgba(black, .05);
    margin-top: 1rem;

    div {
      @extend .container;
      @extend .nav;
    }
      
    a {
      @extend .nav-link;
      cursor: pointer;
      color: red;
      &:hover {
        color: $primary;
      }
    }
  }
</style>
