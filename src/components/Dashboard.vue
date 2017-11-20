<template lang='pug'>
  feed(v-if='$store.getters.isAuth')
  landing(v-else)
</template>

<script>
  export default {
    components: {
      Feed: () => import(/* webpackChunkName: 'feed' */ '=/Feed'),
      Landing: () => import(/* webpackChunkName: 'landing' */ '=/Landing')
    }
  }
</script>
