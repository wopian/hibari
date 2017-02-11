<template lang='pug'>
  .content
    div
      .left
        h1(v-if='user') {{ user.attr.name }}'s Library
</template>

<script>
export default {
  computed: {
    user () {
      return this.$store.state.user.user
    }
  }
}
</script>

<style lang='scss'>
</style>
