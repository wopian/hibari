<template lang='pug'>
  b-dropdown(position='is-bottom-left')
    .navbar-item.has-dropdown(slot='trigger')
      a.navbar-link
        span Login

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

            button.button.is-primary.button-block(
              @click='submit()'
              :class='{ "is-loading": loggingIn }'
            ) Login with Kitsu

            p.help.is-danger(v-if='loginError') {{ loginError }}
</template>

<script>
  export default {
    data () {
      return {
        loggingIn: false,
        loginError: null,
        credentials: {
          username: '',
          password: ''
        }
      }
    },
    methods: {
      async submit () {
        if (!this.$store.getters.getAuth && this.credentials.username && this.credentials.password) {
          try {
            this.loggingIn = true
            const { username, password } = this.credentials
            const { owner } = await import('@/api/oauth' /*  webpackChunkName: 'oauth2' */)
            let { accessToken } = await owner.getToken(username, password)
            this.$store.dispatch('LOGIN', accessToken)
          } catch (error) {
            this.loggingIn = false
            if (error.code) {
              switch (error.code) {
                case 'EAUTH':
                  this.loginError = 'Incorrect username or password'
                  break
                default:
                  this.loginError = `Unknown error: ${error.code}`
              }
            }
          }
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
