<template lang='pug'>
  feed(v-if='$store.getters.isAuth')
  welcome(v-else)
</template>

<script>
  import Feed from '@/components/Feed'
  import Welcome from '@/components/Welcome'

  export default {
    components: {
      Feed,
      Welcome
    }
  }
</script>
