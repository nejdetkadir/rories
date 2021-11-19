<template lang="pug">
  .p-5.mb-4.mt-5.dark-content.rounded-3
    .container-fluid.py-5
      h1.display-5.fw-bold.text-white Welcome to RORIES
      p.col-md-8.fs-4.text-white Looking for the most talked about movies from the around the world? They're all on Rories. You can follow movies, writers, directors, stars and genres then the system will suggest movies based on your follows
      nuxt-link.btn.btn-primary.btn-lg(to="/users") Sign In/Up
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

<style>
.dark-content{
  background-color: #000000bf;
}
</style>