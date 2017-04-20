<template lang='pug'>
  main.container
    h2 {{ $t('bugs.title') }}
    p(v-html='$t("bugs.body")')
    p {{ $t('bugs.requirements') }}
    pre
      | {{ $t('bugs.include.version') }} {{ VERSION }}
      | {{ $t('bugs.include.os') }}
      | {{ $t('bugs.include.browser') }}
      | {{ $t('bugs.include.browserVer') }}
      |
      | {{ $t('bugs.include.replicate') }}
      | 1.
      | 2.
</template>

<script>
  export default {
    metaInfo () {
      return {
        title: this.$t('bugs.title')
      }
    },
    data () {
      return {
        VERSION: VERSION
      }
    }
  }
</script>

<style lang='sass' scoped>
  @import ~styles/variables

  main
    padding-top: calc(56px + 1rem)

  pre
    padding: 1rem
    border-radius: 3px
    border: 1px solid rgba($primary, .1)
    background: darken($white, 1)
</style>
