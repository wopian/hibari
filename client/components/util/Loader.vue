<template lang='pug'>
  .loader
    img(src='/images/loading.gif')
    p {{ message }}
</template>

<script>
  export default {
    props: [
      'message'
    ]
  }
</script>

<style lang='sass'>
  @import ~assets/variables

  .loader
    height: 75px
    width: 100px
    position: relative
    margin: 2rem auto 0
    &::before
      content: ''
      height: 1px
      filter: blur(2px)
      width: 23px
      border-radius: 999rem
      background: rgba($primary, .8)
      display: block
      position: relative
      top: 77px
      left: 41px
    img
      position: relative
      bottom: -1px
      left: 3px
      height: 75px
      width: 50px
      object-fit: cover
      object-position: left
      filter: drop-shadow(1px 1px 1px rgba($primary, .3))
      margin-left: 21px
    p
      text-align: center
      margin-top: .5rem
</style>
