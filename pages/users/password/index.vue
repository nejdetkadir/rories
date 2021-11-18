<template lang="pug">
  .row
    .col-md-6.mx-auto.mt-5.authentication-form-content.mb-5
      form
        .mb-4
          h1.fw-bold.text-white Forgot Password
        .form-floating.mb-3
          input#emailInput.form-control(type='email' placeholder='Email address')
          label(for='emailInput') Email address
        .d-grid.gap-2.mb-5
          button.btn.btn-danger.btn-lg.fw-bold Send Email
        .mt-3
          nuxt-link.btn.btn-link.text-white(to="/users") Go to sing in page.
</template>

<script>
export default {
  head: {
    bodyAttrs: {
      class: 'users-background'
    }
  }
}
</script>