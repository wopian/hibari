<template lang='pug'>
  .container
    h2 Login
    .alert.alert-danger(v-if='error')
      p {{ error }}

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
</template>

<script>
  import auth from '@/api/auth'

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
        const credentials = {
          username: this.credentials.username,
          password: this.credentials.password
        }

        await auth.login(this, credentials)
      }
    }
  }
</script>
