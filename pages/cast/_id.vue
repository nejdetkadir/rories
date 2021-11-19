<script>
import {mapState} from "vuex"
import {error, success} from "~/utils/toast"

export default {
  middleware: 'unauthenticated',
  asyncData({$axios, store, error, params}) {
    return $axios.get(`/cast/${params.id}`, {
      headers: {
        "Authorization": store.state.users.current_user.token,
      }
    }).then(res => {
      return {cast: res.data}
    }).catch(() => {
      error({ statusCode: 404, message: 'Cast not found' })
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
    isFollowingCast() {
      return this.isFollowing === null ? this.cast.is_following : this.isFollowing
    }
  },
  methods: {
    updateFollowingCount(isStartedFollowing) {
      const currentVal = parseInt(this.$refs.followingCount.textContent)

      this.$refs.followingCount.innerHTML = (currentVal + (isStartedFollowing ? 1 : -1))
    },
    async follow() {
      try {
        const {status} = await this.$axios.post(`/cast/${this.$route.params.id}/follow`, null, {
          headers: {
            "Authorization": this.current_user.token,
          }
        })

        if (status === 201) {
          success(this.$toast, `You started following the ${this.cast.fullname}`)
          this.isFollowing = true

          this.updateFollowingCount(true)
        }
      } catch (err) {
        error(this.$toast, "Something went wrong.");
      }
    },
    async unfollow() {
      try {
        const {status} = await this.$axios.delete(`/cast/${this.$route.params.id}/unfollow`, {
          headers: {
            "Authorization": this.current_user.token,
          }
        })

        if (status === 204) {
          success(this.$toast, `You unfollowed the ${this.cast.fullname}`)
          this.isFollowing = false
          
          this.updateFollowingCount(false)
        }
      } catch (err) {
        error(this.$toast, "Something went wrong.");
      }
    },
    followAction() {
      if (this.isFollowing === null) {
        this.isFollowing = this.cast.is_following
      }

      this.isFollowing ? this.unfollow() : this.follow()
    }
  },
}
</script>

<template lang="pug">
  .row.mt-5.mb-5
    .mx-auto(:class="{'col-6' : $device.isDesktop, 'col-12' : !$device.isDesktop}")
      h1.text-center.gradient-title {{cast.fullname}}
      .text-center.mt-4
        img(:src="cast.image.url" :alt="cast.fullname" width="100%")
      p.mt-4.text-danger.text-center {{cast.biography}}
      hr.bg-white
      .d-flex.justify-content-between
        .text-white.fw-bold Following Count
        .text-white.fw-bold(ref="followingCount") {{cast.following_count}}
      hr.bg-white
      .text-center
        button.btn.btn-sm.text-white(@click.prevent="followAction" :class="{'btn-outline-success' : !isFollowingCast, 'btn-outline-danger' : isFollowingCast}")
          | {{isFollowingCast ? 'Unfollow' :'Follow'}}&nbsp;
          i.fas.text-white(:class="{'fa-thumbs-up' : !isFollowingCast, 'fa-thumbs-down' : isFollowingCast, }")
      ul#castTab.nav.nav-tabs.mt-5.justify-content-center(role='tablist')
        li.nav-item(role='presentation')
          button#writer-tab.nav-link.active(data-bs-toggle='tab' data-bs-target='#writer' type='button' role='tab' aria-controls='writer' aria-selected='true') Writer
        li.nav-item(role='presentation')
          button#star-tab.nav-link(data-bs-toggle='tab' data-bs-target='#star' type='button' role='tab' aria-controls='star' aria-selected='false') Star
        li.nav-item(role='presentation')
          button#director-tab.nav-link(data-bs-toggle='tab' data-bs-target='#director' type='button' role='tab' aria-controls='director' aria-selected='false') Director
      #castTabContent.tab-content.text-white
        #writer.tab-pane.fade.show.active(role='tabpanel' aria-labelledby='writer-tab')
          MoviesOfRoles(role="writer" :movies="cast.roles.writer")
        #star.tab-pane.fade(role='tabpanel' aria-labelledby='star-tab')
          MoviesOfRoles(role="star" :movies="cast.roles.star")
        #director.tab-pane.fade(role='tabpanel' aria-labelledby='director-tab')
          MoviesOfRoles(role="director" :movies="cast.roles.director")
</template>

<style>
button.nav-tabs .nav-item.show .nav-link, .nav-tabs .nav-link.active {
  border: none;
  color: #DC3545;
}

button.nav-tabs .nav-item.show .nav-link, .nav-tabs .nav-link {
  color: #DC3545;
}
</style>

