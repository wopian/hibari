<template>
  <div id="app">
    <navbar></navbar>
    <router-view></router-view>
    <footr></footr>
  </div>
</template>

<script>
import Navbar from './Navbar'
import Footr from './Footr'

export default {
  components: {
    Navbar,
    Footr
  }
}
</script>

<style lang='scss'>
@import '~bootstrap/scss/bootstrap';

body {
  img {
    overflow: hidden;
  }
}

body {
  font-family: -apple-system, BlinkMacSystemFont,
               'avenir next', avenir,
               helvetica, 'helvetica neue',
               Ubuntu,
               'segoe ui', arial,
               sans-serif;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

%base {
  // Sticky footer
  flex: 3;
}

main {
  @extend .container;
  @extend %base;
}

footer {
  height: 54px;
  background: rgba(black, .05);
  margin-top: 1rem;
  box-shadow: 0 -1px 0 0 rgba(black, .1);

  div {
    @extend .container;
    padding-top: 1rem;
  }
}
.page {
}
</style>
