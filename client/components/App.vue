<template>
  <div id='app'>
    <app-navbar></app-navbar>
    <notice v-if='showNotice'></notice>
    <router-view>
    </router-view>
    <app-footer></app-footer>
  </div>
</template>

<script>
  import AppNavbar from 'components/AppNavbar'
  import Notice from 'components/Notice'
  import AppFooter from 'components/AppFooter'

  export default {
    data () {
      return {
        showNotice: true
      }
    },
    components: {
      AppNavbar,
      Notice,
      AppFooter
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
