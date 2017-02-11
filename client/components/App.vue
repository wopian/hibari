<template lang='pug'>
  #app
    navbar
    notice(v-if='showNotice')
    router-view
    foobar
</template>

<script>
  import Navbar from 'components/app/Navbar'
  import Notice from 'components/app/Notice'
  import Foobar from 'components/app/Foobar'

  export default {
    data () {
      return {
        showNotice: true
      }
    },
    components: {
      Navbar,
      Notice,
      Foobar
    }
  }
</script>

<style lang='scss'>
  @import '~styles/main.scss';

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

  .page {
  }
</style>
