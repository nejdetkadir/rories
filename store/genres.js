import {error} from "~/utils/toast"

export const state = () => ({
  genres: []
})

export const mutations = {
  setGenres(state, genres) {
    state.genres = genres
  },
  destroyGenres(state) {
    state.genres = []
  }
}

export const actions = {
  async getGenres({commit, rootState}) {
    try {
      const res = await this.$axios.get("/genres", {
        headers: {
          "Authorization" : rootState.users.current_user.token,
        }
      })
      
      commit("setGenres", res.data)      
    } catch (err) {
      error(this.$toast, "Something went wrong when getting genres.")
    }
  }
}
