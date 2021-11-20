<script>
import {mapState} from "vuex"
import {error} from "~/utils/toast"

export default {
  middleware: 'unauthenticated',
  asyncData({$axios, store, error}) {
    return $axios.get(`/feed`, {
      headers: {
        "Authorization": store.state.users.current_user.token,
      }
    }).then(res => {
      return {suggestions: res.data}
    }).catch(() => {
      error({ statusCode: 500, message: 'Something went wrong.' })
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
          this.getMoreSuggestions()
        }
      }
    },
    async getMoreSuggestions() {
      if (this.suggestions.length % 24 === 0 && this.$route.name === 'suggestions') {
        try {
          const res = await this.$axios.get(`/feed?page=${(this.suggestions.length / 24) + 1}`, {
            headers: {
              "Authorization": this.current_user.token,
            }
          })

          if (res.data.length > 0) {
            this.suggestions = this.suggestions.concat(res.data)
          }
        } catch (err) {
          error(this.$toast, "Something went wrong.")
        }
      }
    },
  },
}
</script>

<template lang="pug">
  .row.mt-5.mb-5(:class="{'mobile-row' : !$device.isDesktop}")
    h1.text-center.mb-3.fw-bold.gradient-title Suggestions
    div(v-if="suggestions.length != 0" v-for="movie in suggestions" :key="movie.id" :class="$device.isDesktop ? 'col-3' : 'col-6'")
      Movie(:movie="movie")
    .alert.alert-info.text-center(v-if="suggestions.length === 0")
      i.fas.fa-info-circle.fs-1
      p If you follow somethings (writers/stars/directors/movies or genres), the system will suggest movies for you.
</template>
