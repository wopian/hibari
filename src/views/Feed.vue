<template lang='pug'>
  main
    .hero
      .hero-body
        carousel-quick-update

    section.container
      h1.title.has-text-weight-bold Feed Stuff
</template>

<script>
  import CarouselQuickUpdate from '=/Carousel/CarouselQuickUpdate'
  export default {
    meta: {
      title: 'Feed'
    },
    components: {
      CarouselQuickUpdate
    }
  }
</script>

<style lang='sss' scoped>
  .hero-body
    padding: 0 1.5rem
</style>
