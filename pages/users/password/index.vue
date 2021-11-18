<script>
import {success, unprocessableEntity} from "~/utils/toast"

export default {
  data() {
    return {
      email: '',
    }
  },
  head: {
    bodyAttrs: {
      class: 'users-background'
    }
  },
  methods: {
    async sendResetPasswordEmail() {      
      try {
        const res = await this.$axios.post("/users/password", {
          user: {
            email: this.email
          }
        })

        success(this.$toast, res.data.message)
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
          h1.fw-bold.text-white Forgot Password
        .form-floating.mb-3
          input#emailInput.form-control(type='email' v-model="email" placeholder='Email address')
          label(for='emailInput') Email address
        .d-grid.gap-2.mb-5
          button.btn.btn-danger.btn-lg.fw-bold(@click.prevent="sendResetPasswordEmail") Send Email
        .mt-3
          nuxt-link.btn.btn-link.text-white(to="/users") Go to sing in page.
</template>
