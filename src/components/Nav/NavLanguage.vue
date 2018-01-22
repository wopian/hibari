<template lang='pug'>
  .select.is-small
    select(name='language' @change='changeLanguage')
      option(
        v-for='lang in supportedLanguages'
        :selected='lang === currentLanguage'
        :value='lang'
      ) {{ lang.toUpperCase() }}
</template>

<script>
  import i18n from '@/plugins/translation'
  export default {
    props: {
      // TODO: Language switcher in nav dropdown when logged in
      menu: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      supportedLanguages () {
        return i18n.supportedLanguages
      },
      currentLanguage () {
        return i18n.currentLanguage
      }
    },
    methods: {
      changeLanguage (e) {
        const lang = e.target.value
        const to = this.$router.resolve({ params: { lang } })
        i18n.changeLanguage(lang).then(() => {
          this.$router.push(to.location)
        })
      }
    }
  }
</script>

<style lang='sss' scoped>
  .select
    line-height: 1rem
    display: flex
    align-items: center
    height: unset
  select
    background: transparent
    border: none
    color: var(--colour-whiteSmoke)
  select, .select:hover:after
    border-color: var(--colour-cinnabar)
</style>
