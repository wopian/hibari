<template lang='pug'>
  feed(v-if='$store.getters.isAuth')
  landing(v-else)
</template>

<script>
  export default {
    components: {
      Feed: () => import('+/Feed' /* webpackChunkName: 'feed' */),
      Landing: () => import('+/Landing' /* webpackChunkName: 'landing' */)
    }
  }
</script>
