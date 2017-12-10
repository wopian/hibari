<template lang='pug'>
  select(name='language' @change='changeLanguage')
    option(
      v-for='lang in supportedLanguages'
      :selected='lang === currentLanguage'
      :value='lang'
    ) {{lang}}
</template>

<script>
  import i18n from '@/plugins/translation'
  export default {
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
