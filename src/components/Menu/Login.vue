<template lang='pug'>
  b-dropdown(position='is-bottom-left')
    a.navbar-item(slot='trigger')
      span Login
      b-icon(icon='menu-down')

    b-dropdown-item(custom paddingless)
      form(action='' v-on:submit.prevent='')
        .modal-card
          .modal-card-body
            b-field(label='Email / Username')
              b-input(
                v-model='credentials.username'
                type='text'
                placeholder='Your Email or Username'
                required
              )

            b-field(label='Password')
              b-input(
                v-model='credentials.password'
                type='password'
                placeholder='Your password'
                required
              )

            button.button.is-primary.button-block(@click='submit()') Login with Kitsu
</template>

<script>
  export default {
    data () {
      return {
        credentials: {
          username: '',
          password: ''
        }
      }
    },
    methods: {
      async submit () {
        if (!this.$store.getters.getAuth) {
          const { username, password } = this.credentials
          const { owner } = await import('@/api/oauth' /*  webpackChunkName: 'oauth2' */)
          let { accessToken } = await owner.getToken(username, password)
          this.$store.dispatch('LOGIN', accessToken)
        }
      }
    }
  }
</script>

<style lang='sass' scoped>
  .modal-card
    max-width: 300px

  .button-block
    width: 100%
</style>
