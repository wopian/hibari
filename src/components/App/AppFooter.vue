<template lang='pug'>
  footer.footer
    .container
      .content.has-text-centered
        p
          i18n(
            path='footer.builtBy'
            tag='span'
          )
            strong {{ $t('hibari') }}
            a(href='//wopian.me') wopian
          br
          br
          i18n(
            path='footer.sourceCode'
            tag='span'
          )
            a(href='//github.com/wopian/hibari#license') MIT
          br
          i18n(
            path='footer.contentProvidedBy'
            tag='span'
          )
            a(href='//kitsu.io') Kitsu.io
      pre(v-if='dev') {{ $store.state }}
</template>

<script>
  export default {
    data () {
      return {
        dev: process.env.NODE_ENV === 'development'
      }
    }
  }
</script>

<style lang='sss' scoped>
  footer
    margin-top: 1.5rem

</style>
