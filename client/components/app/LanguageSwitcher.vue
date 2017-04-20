<template lang='pug'>
  .nav.ml-auto
    button.nav-link(v-for='lang in languages' @click='Select(lang.code)') {{ lang.code }}
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

<style lang='sass' scoped>
  @import ~styles/variables

  .nav
    position: relative
    top: 2px

  button
    flex: 0 1 auto
    cursor: pointer
    color: rgba($white, .7)
    background: transparent
    border: 0
    padding: .5em .5rem
    font-size: .75rem

    &:hover
      color: $white
</style>
