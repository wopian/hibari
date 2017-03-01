<template lang='pug'>
  footer
    div
      a(href='https://github.com/wopian/hibari' rel='noopener' target='_blank') Github
</template>

<style lang='sass'>
  @import ~bootstrap/scss/variables
  @import ~bootstrap/scss/mixins
  @import ~bootstrap/scss/grid
  @import ~bootstrap/scss/nav
  @import ~bootstrap/scss/navbar
  @import ~assets/variables

  // Push footer up if notice visible
  // Else footer is hidden behind it
  #app > footer:nth-child(4)
    margin-bottom: 6rem

  footer
    @extend .navbar
    height: 54px
    background: $grey
    margin-top: 1rem

    div
      @extend .container
      @extend .nav

    a
      @extend .nav-link
      cursor: pointer
      color: $black
      &:hover
        color: $primary
</style>
