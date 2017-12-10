<template lang='pug'>
  b-dropdown(position='is-bottom-left')
    .navbar-item.has-dropdown(slot='trigger')
      a.navbar-link
        span {{ $t('login.login') }}

    b-dropdown-item(custom paddingless)
      form(action='' v-on:submit.prevent='')
        .modal-card
          .modal-card-body
            b-field(:label='$t("login.emailLabel")')
              b-input(
                v-model='credentials.username'
                type='text'
                :placeholder='$t("login.emailPlaceholder")'
                required
              )

            b-field(:label='$t("login.passwordLabel")')
              b-input(
                v-model='credentials.password'
                type='password'
                :placeholder='$t("login.passwordPlaceholder")'
                required
              )

            button.button.is-primary.button-block(
              @click='submit()'
              :class='{ "is-loading": loggingIn }'
            ) {{ $t('login.loginWithKitsu') }}

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
            const { data } = await owner.getToken(username, password)
            this.$store.dispatch('LOGIN', data)
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
