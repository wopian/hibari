<template lang='pug'>
  section.alert.alert-dismissible(v-if='show && !matches || !cookie')
    .container
      div
        p(v-html='$t("notice.content")')
      button.close(@click='Hide()')
        span &times;
</template>

<script>
  export default {
    data () {
      return {
        show: true,
        Hide: () => {
          this.show = !this.show
          this.$cookie.set('notice', this.show, 30)
          this.$cookie.set('noticeID', this.$t('notice.id'), 30)
        }
      }
    },
    computed: {
      cookie () {
        return this.$cookie.get('notice')
      },
      matches () {
        // Check if `noticeID` exists
        if (parseInt(this.$cookie.get('noticeID'))) {
          // Check if `noticeID` matches current notice
          if (parseInt(this.$cookie.get('noticeID')) === parseInt(this.$t('notice.id'))) {
            return true
          }
        }
        return false
      }
    }
  }
</script>

<style lang='sass' scoped>
  @import ~assets/variables

  section
    border-radius: 0
    margin-bottom: 0
    background: $primary
    color: rgba($white, .9)
    border: 0
    z-index: 1
    position: sticky
    bottom: 0

  .container
    display: flex
    flex-direction: row
    flex-wrap: nowrap
    justify-content: space-between
    align-content: stretch
    align-items: center
    height: 100%

    div
      flex: 1 1 auto
      align-self: auto
      text-align: center

  p
    margin-bottom: 0

  a
    color: $kitsu

  button
    // Fix .alert-dismissible .close
    // specificity overiding this
    top: 0 !important
    right: -2rem !important

    span
      color: $white
</style>
