<template lang='pug'>
  main.error
    set-title(v-bind:title='404')
    h1 404
</template>

<script>
  import SetTitle from 'components/SetTitle'
  export default {
    components: {
      SetTitle
    }
  }
</script>
