<template lang='pug'>
  .content(v-if='user')
    div
      .left
        h1 {{ user.attr.name }}

      .right
        p.waifu {{ waifu.attributes.name }}
          span {{ user.attr.waifuOrHusbando }}
</template>

<script>
export default {
  computed: {
    user () {
      return this.$store.state.user.user
    },
    waifu () {
      return this.$store.state.user.waifu
    },
    pinned () {
      return this.$store.state.user.pinned
    },
    profileLinks () {
      return this.$store.state.user.profileLinks
    },
    favourites () {
      return this.$store.state.user.favourites
    }
  }
}
</script>

<style lang='scss'>
</style>
