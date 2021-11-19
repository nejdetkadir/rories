import {authErrorHandler, success} from "~/utils/toast"

export const state = () => ({
  current_user: null
})

export const mutations = {
  setUser(state, data) {
    state.current_user = data
  }
}

export const actions = {
  async signIn({commit, dispatch}, user) {
    try {
      const res = await this.$axios.post("/users/sign_in", user)
      
      commit("setUser", {...res.data, token: res.headers.authorization})
      dispatch("genres/getGenres", null, {root: true}) // get genres

      this.$router.push("/home")
      success(this.$toast, "Signed in successfully.")
      
    } catch (error) {
      authErrorHandler(this.$toast, error.response)
    }
  },
  async signUp({commit}, user) {
    try {
      const res = await this.$axios.post("/users", user)
      
      commit("setUser", {...res.data, token: res.headers.authorization})

      this.$router.push("/home")
      success(this.$toast, "Welcome! You have signed up successfully.")

    } catch (error) {
      authErrorHandler(this.$toast, error.response)
    }
  }
}
