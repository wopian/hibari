<template lang='pug'>
  section.alert.alert-dismissible(v-if='show && !matches || !cookie')
    .container
      button.close(@click='Hide()')
        span &times;
      div
        p(v-html='$t("notice.content")')
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
      order: 0
      flex: 1 1 auto
      align-self: auto
      text-align: center

  p
    margin-bottom: 0

  a
    color: $kitsu

  button
    order: 1
    flex: 0 1 auto
    align-self: center
    top: 0
    right: 0
    padding-left: 15px
    position: inherit

    span
      color: $white
</style>
