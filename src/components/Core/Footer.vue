<template lang='pug'>
  footer.footer
    .container
      .content.has-text-centered
        p
          strong Hibari
          | &nbsp;by&nbsp;
          a(href='//wopian.me') wopian
          br
          br
          | Source code licensed under&nbsp;
          a(href='//github.com/wopian/hibari#license') MIT
          br
          | All content provided by&nbsp;
          a(href='//kitsu.io') Kitsu.io
      pre(v-if='development') {{ $store.state }}
</template>

<script>
  export default {
    data () {
      return {
        development: process.env.NODE_ENV === 'development'
      }
    }
  }
</script>

<style lang='sass' scoped>
  footer
    margin-top: 1.5rem
</style>
