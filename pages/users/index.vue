<script>
import {mapActions} from 'vuex'

export default {
  data() {
    return {
      isSignIn: true,
      user: {
        email: '',
        password: '',
        passwordConfirmation: '',
      }
    }
  },
  head: {
    bodyAttrs: {
      class: 'users-background'
    }
  },
  computed: {
    authenticationType() {
      return this.isSignIn ? 'Sign In' : 'Sign Up'
    }
  },
  watch: {
    isSignIn() {
      this.user = {
        email: '',
        password: '',
        passwordConfirmation: '',
      }
    }
  },
  methods: {
    ...mapActions('users', ['signIn', 'signUp']),
    onAuthenticated() {
      this.isSignIn ? this.signIn({
        user: {
          email: this.user.email,
          password: this.user.password
        }
      }) : this.signUp({
        user: {
          email: this.user.email,
          password: this.user.password,
          password_confirmation: this.user.passwordConfirmation
        }
      })
    }
  }
}
</script>

<template lang="pug">
  .row
    .col-md-6.mx-auto.mt-5.authentication-form-content.mb-5
      form
        .mb-4
          h1.fw-bold.text-white {{authenticationType}}
        .form-floating.mb-3
          input#emailInput.form-control(type='email' v-model="user.email" placeholder='Email address')
          label(for='emailInput') Email address
        .form-floating(:class="{'mb-3' : !isSignIn, 'mb-5' : isSignIn}")
          input#floatingPassword.form-control(type='password' v-model="user.password" placeholder='Password')
          label(for='floatingPassword') Password
        .form-floating.mb-5(v-if="!isSignIn")
          input#floatingPasswordConfirmation.form-control(type='password' v-model="user.passwordConfirmation" placeholder='Password Confirmation')
          label(for='floatingPasswordConfirmation') Password Confirmation
        .d-grid.gap-2.mb-5
          button.btn.btn-danger.btn-lg.fw-bold(@click.prevent="onAuthenticated") {{authenticationType}}
        .mt-3
          button.btn.btn-link.text-white(@click.prevent="isSignIn=!isSignIn") {{ isSignIn ? 'New to Rories? Sign up now.' : 'Already have an account? Sign in now.' }}
        .mt-3(v-if="isSignIn")
          nuxt-link.btn.btn-link.text-white(to="/users/password") Forgot password?
</template>

<style>
body.users-background{
  background-image: url('~/assets/background/users-background.jpg');
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
}

.authentication-form-content{
  background-color: #000000bf;
  padding: 3rem;
}

.btn-link{
  text-decoration: none;
}

.btn-link:hover{
  text-decoration: underline;
}

.btn-link:focus{
  box-shadow: none;
}
</style>