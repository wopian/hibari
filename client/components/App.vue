<template>
  <div id='app'>
    <navbar></navbar>
    <notice v-if='showNotice'></notice>
    <router-view>
    </router-view>
    <footr></footr>
  </div>
</template>

<script>
import Navbar from './Navbar'
import Notice from './Notice'
import Footr from './Footr'

export default {
  data () {
    return {
      showNotice: true
    }
  },
  components: {
    Navbar,
    Notice,
    Footr
  }
}
</script>

<style lang='scss'>
@import '~bootstrap/scss/bootstrap';
@import '../styles/main.scss';

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
  @extend %base;
}

#app > :nth-child(2) {
  margin-top: calc(56px);
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
