<template lang='pug'>
  .hello
    h1 {{ msg }}
</template>

<script>
  export default {
    computed: {
      msg () {
        return `${this.name}`
      }
    },
    props: {
      name: {
        default: 'Hello'
      }
    }
  }
</script>
