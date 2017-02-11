<template>
  <footer>
    <div>
      <a href='https://github.com/wopian/hibari' target='_blank'>Github</a>
    </div>
  </footer>
</template>

<style lang='scss'>
  @import '~styles/main.scss';

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
      color: black;
      &:hover {
        color: $primary;
      }
    }
  }
</style>
