<template>
  <header>
    <nav>
      <h1>Hibari</h1>
      <router-link to='/'>Home</router-link>
      <git-hub-corner></git-hub-corner>
    </nav>
  </header>
</template>

<script>
  import GitHubCorner from 'components/GitHubCorner'
  export default {
    components: {
      GitHubCorner
    }
  }
</script>

<style lang='scss'>
  @import '~styles/main.scss';

  header {
    @extend .navbar;
    @extend .navbar-light;
    @extend .fixed-top;

    background: white;
    box-shadow: 0 0 1px 0 rgba(black, .25);

    nav {
      @extend .nav;
      @extend .container;
    }

    h1 {
      @extend .navbar-brand;
      @extend .mb-0;
      padding-left: 15px;
    }

    a {
      @extend .nav-item;
      @extend .nav-link;
    }
  }
</style>
