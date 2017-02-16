<template lang='pug'>
  .switcher
    button(v-for='lang in languages' @click='Select(lang.code)') {{ lang.code }}
</template>

<script>
  // TODO: Implement solution that doesn't require importing Vue for live reload
  import Vue from 'vue'

  export default {
    components: {
      language: {
        props: ['code']
      }
    },
    data () {
      return {
        lang: this.$lang,
        languages: [
          {
            code: 'EN'
          },
          {
            code: 'JA'
          }
        ],
        Select: langNew => {
          console.info(`[HB]: Language set to ${langNew}`)
          Vue.config.lang = langNew.toLowerCase()
          this.$cookie.set('lang', langNew.toLowerCase())
        }
      }
    }
  }
</script>

<style lang='sass'>
  @import ~bootstrap/scss/bootstrap
  @import ~assets/variables

  .switcher
    @extend .nav
    justify-content: flex-end
    flex: 1 1 auto
    // Fix alignment
    position: relative
    top: 2px

    button
      @extend .nav-link
      flex: 0 1 auto
      cursor: pointer
      color: rgba(white, .7)
      background: transparent
      border: 0
      padding: .5em .5rem
      font-size: .75rem

      &:hover
        color: white
</style>
