<template lang="pug">
  div
    nav.navbar.navbar-expand-lg.fixed-top.navbar-dark.bg-dark
      .container-fluid
        nuxt-link.navbar-brand.fw-bolder.text-danger(to="/") RORIES
        button.navbar-toggler.p-0.border-0(@click.prevent="offcanvasOpened=!offcanvasOpened")
          span.navbar-toggler-icon
        .navbar-collapse.offcanvas-collapse(:class="{'open' : offcanvasOpened}")
          ul.navbar-nav.me-auto.mb-2.mb-lg-0.fw-bold.text-white
            li.nav-item
              nuxt-link.nav-link(@click.native="offcanvasOpened=false" to="/") Home
            li.nav-item
              nuxt-link.nav-link(@click.native="offcanvasOpened=false" to="/users") Sign in/up
            li.nav-item.dropdown
              a#userDropdownHeader.nav-link.dropdown-toggle(href='#' data-bs-toggle='dropdown' aria-expanded='false') Profile
              ul.dropdown-menu.dropdown-dark(aria-labelledby='userDropdownHeader')
                li
                  a.dropdown-item(href='#') Action
                li
                  a.dropdown-item(href='#') Another action
                li
                  a.dropdown-item(href='#') Something else here
          form.d-flex
            input.form-control.form-control-sm.me-2(type='search' placeholder='Search')
            button.btn.btn-outline-danger.btn-sm(type='submit') Search
    .nav-scroller.bg-body.shadow-sm
      nav.nav.nav-underline(aria-label='Secondary navigation')
        nuxt-link.nav-link(to="/genres/1" v-for="i in 20" :key="i") Genre {{i}}
    main.container
      Nuxt
</template>

<script>
export default {
  data() {
    return {
      offcanvasOpened: false
    }
  }
}
</script>

<style>
html,
body {
  overflow-x: hidden; /* Prevent scroll on narrow devices */
}

body {
  padding-top: 56px;
}

@media (max-width: 991.98px) {
  .offcanvas-collapse {
    position: fixed;
    top: 56px; /* Height of navbar */
    bottom: 0;
    left: 100%;
    width: 100%;
    padding-right: 1rem;
    padding-left: 1rem;
    overflow-y: auto;
    visibility: hidden;
    background-color: #343a40;
    transition: transform .3s ease-in-out, visibility .3s ease-in-out;
  }
  .offcanvas-collapse.open {
    visibility: visible;
    transform: translateX(-100%);
  }
}

.nav-scroller {
  position: relative;
  z-index: 2;
  height: 2.75rem;
  overflow-y: hidden;
}

.nav-scroller .nav {
  display: flex;
  flex-wrap: nowrap;
  padding-bottom: 1rem;
  margin-top: -1px;
  overflow-x: auto;
  color: rgba(255, 255, 255, .75);
  text-align: center;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
}

.nav-underline .nav-link {
  padding-top: .75rem;
  padding-bottom: .75rem;
  font-size: .875rem;
  color: #6c757d;
}

.nav-underline .nav-link:hover {
  color: #DC3545;
}

.nav-underline .active {
  font-weight: 500;
  color: #343a40;
}

.dropdown-dark {
  background-color: #343a40 !important;
  color: white !important;
  border: none;
}

.dropdown-dark > li > a {
  color: white;
}

.dropdown-dark > li > a:hover {
  color: #DC3545;
  background-color: #343a40;
}

.navbar-dark .navbar-nav .nav-link {
  color: white;
}

.form-control:focus{
  border-color: #DC3545;
  box-shadow: none;
}
</style>