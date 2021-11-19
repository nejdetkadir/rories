<script>
import {mapState} from "vuex"
import {error} from "~/utils/toast"

export default {
  middleware: 'unauthenticated',
  asyncData({$axios, store, error}) {
    return $axios.get(`/movies`, {
      headers: {
        "Authorization": store.state.users.current_user.token,
      }
    }).then(res => {
      return {movies: res.data}
    }).catch(() => {
      error({ statusCode: 404, message: 'Movies not found' })
    })
  },
  head: {
    bodyAttrs: {
      class: 'bg-dark'
    }
  },
  computed: {
    ...mapState('users', ['current_user']),
  },
  mounted() {
    this.checkScroll()
  },
  methods: {
    checkScroll () {
      window.onscroll = () => {
        const bottomOfWindow = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop) + window.innerHeight === document.documentElement.offsetHeight

        if (bottomOfWindow) {
          this.getMoreMovies()
        }
      }
    },
    async getMoreMovies() {
      if (this.movies.length % 24 === 0 && this.$route.name === 'home') {
        try {
          const res = await this.$axios.get(`/movies?page=${(this.movies.length / 24) + 1}`, {
            headers: {
              "Authorization": this.current_user.token,
            }
          })

          if (res.data.length > 0) {
            this.movies = this.movies.concat(res.data)
          }
        } catch (err) {
          error(this.$toast, "Something went wrong.")
        }
      }
    },
  }
}
</script>

<template lang="pug">
  .row.mt-5.mb-5
    div(v-for="movie in movies" :key="movie.id" :class="$device.isDesktop ? 'col-3' : 'col-6'")
      Movie(:movie="movie")
</template>
