<template lang='pug'>
  feed(v-if='$store.getters.isAuth')
  .jumbotron(v-else)
    .container Hello World
</template>

<script>
  import Feed from '@/components/Feed'

  export default {
    components: {
      Feed
    }
  }
</script>
