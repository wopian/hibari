<template lang='pug'>
    div Template for {{ type }}
</template>

<script>
  export default {
    data () {
      return {
        type: this.$route.meta.type
      }
    }
  }
</script>
