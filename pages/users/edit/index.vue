<script>
import {mapState, mapActions} from "vuex"

export default {
  middleware: 'unauthenticated',
  data() {
    return {
      user: {
        email: '',
        password: '',
        passwordConfirmation: '',
        currentPassword: ''
      }
    }
  },
  head: {
    bodyAttrs: {
      class: 'bg-dark'
    }
  },
  computed: {
    ...mapState("users", ["current_user"])
  },
  mounted() {
    this.user.email = this.current_user.email
  },
  methods: {
    ...mapActions("users", ["updateUser"]),
    onUpdated() {
      this.updateUser({
        user: {
          email: this.user.email,
          password: this.user.password,
          password_confirmation: this.user.passwordConfirmation,
          current_password: this.user.currentPassword
        }
      })

      this.user = {
        email: this.current_user.email,
        password: '',
        passwordConfirmation: '',
        currentPassword: ''
      }
    }
  }
}
</script>

<template lang="pug">
  .row
    .col-md-6.mx-auto.mt-5.mb-5
      form
        .mb-4
          h1.fw-bold.text-white Settings
        .form-floating.mb-3
          input#emailInput.form-control(type='email' v-model="user.email" placeholder='Email address')
          label(for='emailInput') Email address
        .form-floating.mb-3
          input#floatingPassword.form-control(type='password' v-model="user.password" placeholder='Password')
          label(for='floatingPassword') Password
        .form-floating.mb-3
          input#floatingPasswordConfirmation.form-control(type='password' v-model="user.passwordConfirmation" placeholder='Password Confirmation')
          label(for='floatingPasswordConfirmation') Password Confirmation
        .form-floating.mb-3
          input#floatingCurrentPassword.form-control(type='password' v-model="user.currentPassword" placeholder='Current Password')
          label(for='floatingCurrentPassword') Current Password
        .d-grid.gap-2.mb-5
          button.btn.btn-danger.btn-lg.fw-bold(@click.prevent="onUpdated") Update
</template>
