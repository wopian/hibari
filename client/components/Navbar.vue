<template>
  <header>
    <nav>
      <h1>Hibari</h1>
      <router-link to='/'>Home</router-link>
    </nav>
  </header>
</template>

<script>
export default {
}
</script>

<style lang='scss'>
@import '~bootstrap/scss/bootstrap';

header {
  @extend .navbar;
  @extend .navbar-light;
  @extend .fixed-top;

  background: white;
  box-shadow: 0 0 1px 0 rgba(black, .25);

  nav {
    @extend .container;
    @extend .nav;
  }

  h1 {
    @extend .navbar-brand;
    @extend .mb-0;
  }

  a {
    @extend .nav-item;
    @extend .nav-link;
  }
}
</style>
