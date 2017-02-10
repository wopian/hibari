<template>
  <section role='alert' v-if='show'>
    <div>
      <button type='button' @click='Hide()'>
        <span>&times;</span>
      </button>
    <!--
    <h4 class='alert-heading'>Notice</h4>
    -->
      <div>
        <p>As of 8th February '17, Hibari has been rewritten from scratch to support the Kitsu API</p>
        <p>This version is very early alpha and is prone to bugs and breakages. Feel free to send me suggestions on <a href='//kitsu.io/users/wopian'>Kitsu</a></p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      show: true,
      Hide: () => {
        this.show = !this.show
      }
    }
  }
}
</script>

<style lang='scss'>
  @import '~styles/main.scss';

  section[role='alert'] {
    @extend .alert;
    @extend .alert-dismissible;
    border-radius: 0;
    margin-bottom: 0;
    background: darken(white, 2);
    border: 0;
    z-index: 1;

    > div {
      @extend .container;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: space-between;
      align-content: stretch;
      align-items: flex-start;

      div {
        order: 0;
        flex: 1 1 auto;
        align-self: auto;
      }
    }

    P:last-of-type {
      @extend .mb-0;
    }

    a {
      color: $primary;
    }

    button {
      @extend .close;
      order: 1;
      flex: 0 1 auto;
      align-self: center;
      top: 0;
      right: 0;
      padding-left: 15px;
      span {
        color: darken(white, 15);
      }
    }
  }
</style>
