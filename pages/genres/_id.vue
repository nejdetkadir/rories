<script>
import {mapState} from "vuex"
import {error, success} from "~/utils/toast"

export default {
  middleware: 'unauthenticated',
  asyncData({$axios, store, error, params}) {
    return $axios.get(`/genres/${params.id}`, {
      headers: {
        "Authorization": store.state.users.current_user.token,
      }
    }).then(res => {
      return {genre: res.data}
    }).catch(() => {
      error({ statusCode: 404, message: 'Genre not found' })
    })
  },
  data() {
    return {
      isFollowing: null
    }
  },
  head: {
    bodyAttrs: {
      class: 'bg-dark'
    }
  },
  computed: {
    ...mapState('users', ['current_user']),
    isFollowingGenre() {
      return this.isFollowing === null ? this.genre.is_following : this.isFollowing
    }
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
      if (this.genre.movies.length % 24 === 0 && this.$route.name === 'genres-id') {
        try {
          const res = await this.$axios.get(`/genres/${this.$route.params.id}?page=${(this.genre.movies.length / 24) + 1}`, {
            headers: {
              "Authorization": this.current_user.token,
            }
          })

          if (res.data.movies.length > 0) {
            this.genre.movies = this.genre.movies.concat(res.data.movies)
          }
        } catch (err) {
          error(this.$toast, "Something went wrong.")
        }
      }
    },
    async follow() {
      try {
        const {status} = await this.$axios.post(`/genres/${this.$route.params.id}/follow`, null, {
          headers: {
            "Authorization": this.current_user.token,
          }
        })

        if (status === 201) {
          success(this.$toast, `You started following the ${this.genre.genre.name}`)
          this.isFollowing = true
        }
      } catch (err) {
        error(this.$toast, "Something went wrong.");
      }
    },
    async unfollow() {
      try {
        const {status} = await this.$axios.delete(`/genres/${this.$route.params.id}/unfollow`, {
          headers: {
            "Authorization": this.current_user.token,
          }
        })

        if (status === 204) {
          success(this.$toast, `You unfollowed the ${this.genre.genre.name}`)
          this.isFollowing = false
        }
      } catch (err) {
        error(this.$toast, "Something went wrong.");
      }
    },
    followAction() {
      if (this.isFollowing === null) {
        this.isFollowing = this.genre.is_following
      }

      this.isFollowing ? this.unfollow() : this.follow()
    }
  },
}
</script>

<template lang="pug">
  .row.mt-2.mb-5(:class="{'mobile-row' : !$device.isDesktop}")
    .d-block.text-center
      h1.text-center.mb-3.mt-5.fw-bold.gradient-title {{genre.genre.name}}
      button.btn.btn-sm.text-white(@click.prevent="followAction" :class="{'btn-outline-success' : !isFollowingGenre, 'btn-outline-danger' : isFollowingGenre}")
        | {{isFollowingGenre ? 'Unfollow' :'Follow'}}&nbsp;
        i.fas.text-white(:class="{'fa-thumbs-up' : !isFollowingGenre, 'fa-thumbs-down' : isFollowingGenre, }")
    div(v-for="movie in genre.movies" :key="movie.id" :class="$device.isDesktop ? 'col-3' : 'col-6'")
      Movie(:movie="movie")
</template>

<style>
h1.gradient-title{
  background: -webkit-linear-gradient(#DC3545, #560000);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
