<template lang='pug'>
  a.nav-item.dropdown()
  .modal.show(v-if='!$store.getters.isAuth')
    .modal-dialog
      .modal-header
        h5 Login
        button.close

      .modal-body
        .form-group
        input.form-control(
          type='text'
          placeholder='Enter your username'
          v-model='credentials.username'
        )
        .form-group
          input.form-control(
            type='password'
            placeholder='Enter your password'
            v-model='credentials.password'
          )
        button.btn.btn-primary(@click='submit()') Login

      .modal-footer(v-if='error')
        p  {{ error }}

  .container(v-else) Already logged in
</template>

<script>
  import OAuth2 from 'client-oauth2'

  export default {
    data () {
      return {
        credentials: {
          username: '',
          password: ''
        },
        error: ''
      }
    },
    methods: {
      async submit () {
        if (!this.$store.getters.getAuth) {
          const { username, password } = this.credentials

          const { owner } = new OAuth2({
            clientId: '',
            clientSecret: '',
            accessTokenUri: 'https://kitsu.io/api/oauth/token'
          })

          let { accessToken } = await owner.getToken(username, password)
          this.$store.commit('SET_TOKEN', accessToken)
        }
      }
    }
  }
</script>
