<script>
import {success, unprocessableEntity} from "~/utils/toast"

export default {
  data() {
    return {
      password: '',
      passwordConfirmation: '',
      isLoading: false
    }
  },
  head: {
    bodyAttrs: {
      class: 'users-background'
    }
  },
  methods: {
    async resetPassword() {
      try {
        await this.$axios.patch('/users/password', {
          user: {
            password: this.password,
            password_confirmation: this.passwordConfirmation,
            reset_password_token: this.$route.params.reset_password_token
          }
        })

        success(this.$toast, "Your password has been changed successfully.")
      } catch (error) {
        unprocessableEntity(this.$toast, error.response.data)
      }
    }
  }
}
</script>

<template lang="pug">
  .row
    .col-md-6.mx-auto.mt-5.authentication-form-content.mb-5
      form
        .mb-4
          h1.fw-bold.text-white Reset Password
        .form-floating.mb-3
          input#passwordInput.form-control(type='password' v-model="password" placeholder='Password')
          label(for='passwordInput') Password
        .form-floating.mb-3
          input#passwordConfirmationInput.form-control(type='password' v-model="passwordConfirmation" placeholder='Password Confirmation')
          label(for='passwordConfirmationInput') Password Confirmation
        .d-grid.gap-2.mb-5
          button.btn.btn-danger.btn-lg.fw-bold(@click.prevent="resetPassword") Reset Password
        .mt-3
          nuxt-link.btn.btn-link.text-white(to="/users") Go to sing in page.
</template>
