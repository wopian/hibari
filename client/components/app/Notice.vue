<template lang='pug'>
  section.notice(v-if='show && !matches || !cookie')
    div
      button(@click='Hide()')
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
          this.$cookie.set('notice', this.show)
          this.$cookie.set('noticeID', this.$t('notice.id'))
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

<style lang='sass'>
  @import ~bootstrap/scss/bootstrap
  @import ~assets/variables

  section.notice
    @extend .alert
    @extend .alert-dismissible
    border-radius: 0
    margin-bottom: 0
    background: darken(white, 2)
    border: 0
    z-index: 1

    > div
      @extend .container
      display: flex
      flex-direction: row
      flex-wrap: nowrap
      justify-content: space-between
      align-content: stretch
      align-items: flex-start

      div
        order: 0
        flex: 1 1 auto
        align-self: auto
        text-align: center

    p:last-of-type
      @extend .mb-0

    a
      color: $primary

    button
      @extend .close
      order: 1
      flex: 0 1 auto
      align-self: center
      top: 0
      right: 0
      padding-left: 15px

      span
        color: darken(white, 20)
</style>
