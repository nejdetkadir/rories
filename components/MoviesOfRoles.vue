<script>
export default {
  props: {
    role: {
      type: String,
      required: true
    },
    movies: {
      type: Array,
      required: true
    }
  }
}
</script>

<template lang="pug">
  ol.list-group.list-group-numbered
    li.list-group-item.movie.d-flex.justify-content-between.align-items-start(v-for="movie in movies" :key="movie.movie.id")
      .ms-2.me-auto
        .fw-bold.text-white {{movie.movie.title}}
        .d-flex
          .d-flex.align-items-center(v-for="(genre, index) in movie.movie.genres" :key="genre.id")
            .fw-smaller.text-white(v-if="index > 0") &nbsp;|&nbsp;
            nuxt-link.genre-link(:to="'/genres/' + genre.id" :class="{'fs-6' : $device.isDesktop, 'fs-7' : !$device.isDesktop}") {{genre.name}}
    .alert.alert-info.text-center.mt-2(v-if="movies.length === 0")
      i.fas.fa-info-circle.fs-2
      p Empty
</template>

<style>
li.list-group-item.movie{
  background-color: transparent;
  border-bottom: 1px solid #DC3545;
}
</style>