<script>
import {mapState, mapActions} from 'vuex'

export default {
  data() {
    return {
      offcanvasOpened: false,
      searchValue: ''
    }
  },
  computed: {
    ...mapState('genres', ['genres']),
    ...mapState('users', ['current_user'])
  },
  methods: {
    ...mapActions('movies', ['searchMovie']),
    onSearchMovie() {
      if(this.searchValue.length > 0) {

        this.searchMovie({
          q: {
            title_cont: this.searchValue
          }
        })

        this.searchValue = ''
        this.offcanvasOpened = false

        if (this.$route.name !== 'search') {
          this.$router.push('/search')
        }
      }
    }
  }
}
</script>

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
              nuxt-link.nav-link(@click.native="offcanvasOpened=false" :to="current_user ? '/home' : '/'") Home
            li.nav-item(v-if="current_user")
              nuxt-link.nav-link(@click.native="offcanvasOpened=false" to="/suggestions") Suggestions
            li.nav-item(v-if="!current_user")
              nuxt-link.nav-link(@click.native="offcanvasOpened=false" to="/users") Sign in/up
            li.nav-item.dropdown(v-if="current_user")
              a#userDropdownHeader.nav-link.dropdown-toggle(href='#' data-bs-toggle='dropdown' aria-expanded='false') Profile
              ul.dropdown-menu.dropdown-dark(aria-labelledby='userDropdownHeader')
                li
                  a.dropdown-item(href='#') Action
                li
                  a.dropdown-item(href='#') Another action
                li
                  a.dropdown-item(href='#') Something else here
          form.d-flex(v-if="current_user")
            input.form-control.form-control-sm.me-2(type='search' v-model="searchValue" placeholder='Search')
            button.btn.btn-outline-danger.btn-sm(@click.prevent="onSearchMovie") Search
    .nav-scroller.bg-body.shadow-sm(v-if="current_user")
      nav.nav.nav-underline
        nuxt-link.nav-link(:to="'/genres/'+genre.id" v-for="genre in genres" :key="genre.id") {{genre.name}}
    main.container
      Nuxt
</template>

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