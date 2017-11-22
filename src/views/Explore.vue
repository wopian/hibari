<template lang='pug'>
  p View for {{ $store.state.route.name }}
</template>

<script>
  export default {
    meta () {
      return {
        title: `Explore ${this.$store.state.route.meta.type}`
      }
    }
  }
</script>
