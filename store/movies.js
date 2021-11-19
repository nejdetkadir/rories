import {error} from "~/utils/toast"

export const state = () => ({
  results: []
})

export const mutations = {
  setResults(state, results) {
    state.results = results
  }
}

export const actions = {
  async searchMovie({commit, rootState}, data) {
    try {
      const res = await this.$axios.post("/movies/search", data, {
        headers: {
          "Authorization" : rootState.users.current_user.token,
        }
      })
      
      commit("setResults", res.data)      
    } catch (err) {
      error(this.$toast, "Something went wrong when searching movies.")
    }
  }
}
