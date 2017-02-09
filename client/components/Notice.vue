<template>
  <section role='alert'>
    <div>
    <!--
    <h4 class='alert-heading'>Notice</h4>
    -->
      <p>As of 8th February '17, Hibari has been rewritten from scratch to support the Kitsu API</p>
      <p>This version is very early alpha and is prone to bugs and breakages. Feel free to send me suggestions on <a href='//kitsu.io/users/wopian'>Kitsu</a></p>
    </div>
  </section>
</template>

<style lang='scss'>
  @import '~styles/main.scss';
  section[role='alert'] {
    @extend .alert;
    @extend .alert-info;
    border-radius: 0;
    margin-bottom: 0;
    background: lighten($primary, 50);
    border: 0;
    z-index: 1;
    box-shadow: 0 0 1px 0 rgba(black, .25);

    div {
      @extend .container;
    }

    P:last-of-type {
      @extend .mb-0;
    }
  }
</style>
