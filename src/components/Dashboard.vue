<template lang='pug'>
  feed(v-if='$store.getters.isAuth')
  landing(v-else)
</template>

<script>
  import Feed from '@/components/Feed'
  import Landing from '@/components/Landing'

  export default {
    components: {
      Feed,
      Landing
    }
  }
</script>
