<template lang='pug'>
  feed(v-if='$store.getters.isAuth')
  landing(v-else)
</template>

<script>
  export default {
    components: {
      Feed: () => import('@/components/Feed'),
      Landing: () => import('@/components/Landing')
    }
  }
</script>
