<template lang='pug'>
  main
    .hero
      .hero-body
        flickity-quick-update

    section.container
      h1.title.has-text-weight-bold Feed Stuff
</template>

<script>
  import FlickityQuickUpdate from '=/Flickity/FlickityQuickUpdate'
  export default {
    meta: {
      title: 'Feed'
    },
    components: {
      FlickityQuickUpdate
    }
  }
</script>

<style lang='sass' scoped>
  .hero-body
    padding: 0 1.5rem
</style>
