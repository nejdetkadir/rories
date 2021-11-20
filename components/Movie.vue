<script>
export default {
  props: {
    movie: {
      type: Object,
      required: true
    }
  },
}
</script>

<template lang="pug">
  nuxt-link.text-decoration-none(:to="'/movies/' + movie.id")
    .card.shadow.movie.mt-4
      img.card-img-top(:src='movie.cover.thumb.url' :alt='movie.title')
      .card-body.text-white.text-center
        h5.card-text.fw-bold.fst-italic {{movie.title}} ({{movie.released_at}})
        .d-flex.justify-content-center
          .d-flex(v-for="(genre, index) in movie.genres" :key="genre.id" :class="$device.isDesktop ? 'fw-bold' : 'fw-xxsmall'")
            .fw-bold(v-if="index > 0") &nbsp;|&nbsp;
            nuxt-link.genre-link(:to="'/genres/' + genre.id") {{genre.name}}
</template>

<style>
.card.movie{
  background-color: transparent;
}

a.genre-link{
  color: #DC3545;
  text-decoration: none;
}

a.genre-link:hover{
  text-decoration: underline;
}

.fw-smaller{
  font-size: smaller;
}
</style>