<script>
import {mapState} from "vuex"
import {error, success} from "~/utils/toast"

export default {
  middleware: 'unauthenticated',
  asyncData({$axios, store, error, params}) {
    return $axios.get(`/movies/${params.id}`, {
      headers: {
        "Authorization": store.state.users.current_user.token,
      }
    }).then(res => {
      return {movie: res.data}
    }).catch(() => {
      error({ statusCode: 404, message: 'Movie not found' })
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
    isFollowingMovie() {
      return this.isFollowing === null ? this.movie.is_following : this.isFollowing
    }
  },
  methods: {
    updateFollowingCount(isStartedFollowing) {
      const currentVal = parseInt(this.$refs.followingCount.textContent)

      this.$refs.followingCount.innerHTML = (currentVal + (isStartedFollowing ? 1 : -1))
    },
    async follow() {
      try {
        const {status} = await this.$axios.post(`/movies/${this.$route.params.id}/follow`, null, {
          headers: {
            "Authorization": this.current_user.token,
          }
        })

        if (status === 201) {
          success(this.$toast, `You started following the ${this.movie.title}`)
          this.isFollowing = true

          this.updateFollowingCount(true)
        }
      } catch (err) {
        error(this.$toast, "Something went wrong.");
      }
    },
    async unfollow() {
      try {
        const {status} = await this.$axios.delete(`/movies/${this.$route.params.id}/unfollow`, {
          headers: {
            "Authorization": this.current_user.token,
          }
        })

        if (status === 204) {
          success(this.$toast, `You unfollowed the ${this.movie.title}`)
          this.isFollowing = false
          
          this.updateFollowingCount(false)
        }
      } catch (err) {
        error(this.$toast, "Something went wrong.");
      }
    },
    followAction() {
      if (this.isFollowing === null) {
        this.isFollowing = this.movie.is_following
      }

      this.isFollowing ? this.unfollow() : this.follow()
    }
  },
}
</script>

<template lang="pug">
  .row.mt-5.mb-5
    .text-center(:class="{'col-6' : $device.isDesktop, 'col-12' : !$device.isDesktop}")
      img(:src="movie.cover.url" :alt="movie.title" width="100%")
    .ps-2.pe-2(:class="{'col-6' : $device.isDesktop, 'col-12 mt-4' : !$device.isDesktop}")
      h1.text-white.fw-bold {{movie.title}}
      hr.bg-white
      .d-flex.justify-content-between.align-items-center.mt-2
        h5.text-white IMDb Rating
        .d-flex.justify-content-between.align-items-center
          i.fas.fa-star.imdb-color.fs-4.pe-2
          .fs-4.text-white {{movie.imdb_rating}}/10
      .d-flex.justify-content-between.align-items-center.mt-2
        h5.text-white Released At
        .d-flex.justify-content-between.align-items-center
          .fs-4.text-white {{movie.released_at}}
      .d-flex.justify-content-between.align-items-center.mt-2(v-if="movie.minimum_age")
        h5.text-white Minimum Age
        .d-flex.justify-content-between.align-items-center
          .fs-4.text-white +{{movie.minimum_age}}
      .d-flex.justify-content-between.align-items-center.mt-2
        h5.text-white Minutes
        .d-flex.justify-content-between.align-items-center
          .fs-4.text-white {{movie.minutes}}
      .d-flex.justify-content-between.align-items-center.mt-2
        h5.text-white {{movie.genres.length > 1 ? 'Genres' : 'Genre'}}
        .d-flex.justify-content-between.align-items-center
          .d-flex.align-items-center.fs-4.text-white(v-for="(genre, index) in movie.genres" :key="genre.id")
            .fw-smaller(v-if="index > 0") &nbsp;|&nbsp;
            nuxt-link.genre-link(:to="'/genres/' + genre.id" :class="{'fs-6' : $device.isDesktop, 'fs-7' : !$device.isDesktop}") {{genre.name}}
      .d-flex.justify-content-between.align-items-center.mt-2
        h5.text-white {{movie.cast.director.length > 1 ? 'Directors' : 'Director'}}
        .d-flex.justify-content-between.align-items-center
          .d-flex.align-items-center.fs-4.text-white(v-for="(director, index) in movie.cast.director" :key="director.cast.id")
            .fw-smaller(v-if="index > 0") &nbsp;|&nbsp;
            nuxt-link.genre-link(:to="'/cast/' + director.cast.id" :class="{'fs-6' : $device.isDesktop, 'fs-7' : !$device.isDesktop}") {{director.cast.fullname}}
      .d-flex.justify-content-between.align-items-center.mt-2
        h5.text-white {{movie.cast.writer.length > 1 ? 'Writers' : 'Writer'}}
        .d-flex.justify-content-between.align-items-center
          .d-flex.align-items-center.fs-4.text-white(v-for="(writer, index) in movie.cast.writer" :key="writer.cast.id")
            .fw-smaller(v-if="index > 0") &nbsp;|&nbsp;
            nuxt-link.genre-link(:to="'/cast/' + writer.cast.id" :class="{'fs-6' : $device.isDesktop, 'fs-7' : !$device.isDesktop}") {{writer.cast.fullname}}
      .d-flex.justify-content-between.align-items-center.mt-2
        h5.text-white {{movie.cast.star.length > 1 ? 'Stars' : 'Star'}}
        .d-flex.justify-content-between.align-items-center
          .d-flex.align-items-center.fs-4.text-white(v-for="(star, index) in movie.cast.star" :key="star.cast.id")
            .fw-smaller(v-if="index > 0") &nbsp;|&nbsp;
            nuxt-link.genre-link(:to="'/cast/' + star.cast.id" :class="{'fs-6' : $device.isDesktop, 'fs-7' : !$device.isDesktop}") {{star.cast.fullname}}
      .d-block.text-white
        h5.text-white Storyline
        p.text-danger {{movie.storyline}}
      .d-flex.justify-content-between.align-items-center.mt-2
        h5.text-white Following Count
        .d-flex.justify-content-between.align-items-center
          .fs-4.text-white(ref="followingCount") {{movie.following_count}}
      hr.bg-white
      .d-flex.justify-content-around.align-items-center
        button.btn.btn-sm.text-white(@click.prevent="followAction" :class="{'btn-outline-success' : !isFollowingMovie, 'btn-outline-danger' : isFollowingMovie}")
          | {{isFollowingMovie ? 'Unfollow' :'Follow'}}&nbsp;
          i.fas.text-white(:class="{'fa-thumbs-up' : !isFollowingMovie, 'fa-thumbs-down' : isFollowingMovie, }")
        a.btn.btn-outline-primary.btn-sm(:href="movie.trailer.url" v-if="movie.trailer.url") Watch Trailer
        a.btn.btn-outline-warning.btn-sm(:href="'https://www.imdb.com/title/' + movie.imdb_id" target="_blank") Browse on IMDb
</template>

<style>
.imdb-color{
  color: #f5c518;
}

.fs-7 {
  font-size: 0.6rem!important;
}
</style>
