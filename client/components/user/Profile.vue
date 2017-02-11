<template lang='pug'>
  .content(v-if='this.$store.state.user.user')
    div
      .left
        h1 {{ this.$store.state.user.user.attr.name }}

      .right
        p.waifu {{ this.$store.state.user.waifu.attributes.name }}
          span {{ this.$store.state.user.user.attr.waifuOrHusbando }}
</template>

<style lang='scss'>
</style>
