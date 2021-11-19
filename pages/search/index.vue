<script>
import {mapState} from "vuex"

export default {
  middleware: 'unauthenticated',
  head: {
    bodyAttrs: {
      class: 'bg-dark'
    }
  },
  computed: {
    ...mapState('movies', ["results"])
  }
}
</script>

<template lang="pug">
  .row.mt-5.mb-5
    h1.text-center.mb-3.fw-bold.gradient-title Results
    div(v-for="movie in results" :key="movie.id" :class="$device.isDesktop ? 'col-3' : 'col-6'")
      Movie(:movie="movie")
    .alert.alert-info.text-center(v-if="results.length === 0")
      i.fas.fa-info-circle.fs-1
      p Movie not found.
</template>
