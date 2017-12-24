<template lang='pug'>
  landing(v-if='!$store.getters.isAuth')
  feed(v-else)
</template>

<script>
  import Feed from '+/Feed'
  import Landing from '+/Landing'

  export default {
    components: {
      Feed,
      Landing
    }
  }
</script>
