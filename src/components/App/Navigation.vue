<template lang='pug'>
nav.navbar.navbar-light.bg-light
  .container
    router-link.navbar-brand Hibari
    .navbar-nav
      router-link.nav-item.nav-link.active(to='/anime') Anime
      router-link.nav-item.nav-link(to='/manga') Manga
      router-link.nav-item.nav-link(to='/drama') Drama
</template>

<script>
  export default {
    name: 'navigation'
  }
</script>

<style lang='sass' scoped>
  nav
    flex-direction: row
    flex-wrap: nowrap
    justify-content: flex-start
    .container
      justify-content: flex-start
    .navbar-nav
      flex-direction: row
    .nav-link
      padding: .5rem .5rem
</style>
