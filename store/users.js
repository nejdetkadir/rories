import {authErrorHandler, success, unprocessableEntity, error} from "~/utils/toast"

export const state = () => ({
  current_user: null
})

export const mutations = {
  setUser(state, data) {
    state.current_user = data
  },
  destroyUser(state) {
    state.current_user = null
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
  async signUp({commit, dispatch}, user) {
    try {
      const res = await this.$axios.post("/users", user)
      
      commit("setUser", {...res.data, token: res.headers.authorization})
      dispatch("genres/getGenres", null, {root: true}) // get genres

      this.$router.push("/home")
      success(this.$toast, "Welcome! You have signed up successfully.")

    } catch (error) {
      authErrorHandler(this.$toast, error.response)
    }
  },
  async updateUser({state, commit}, user) {
    try {
      const res = await this.$axios.patch("/users", user, {
        headers: {
          "Authorization" : state.current_user.token,
        }
      })

      commit("setUser", {...res.data, token: state.current_user.token})
      success(this.$toast, "Your account has been updated successfully.")

    } catch (err) {
      unprocessableEntity(this.$toast, err.response.data)
    }
  },
  async signOut({state, commit}) {
    try {
      await this.$axios.delete("/users/sign_out", {
        headers: {
          "Authorization" : state.current_user.token,
        }
      })

      // clear vuex
      commit("destroyUser")
      commit("genres/destroyGenres", null, {root: true})
      commit("movies/destroyResults", null, {root: true})

      this.$router.push("/")
      success(this.$toast, "Signed out successfully.")

    } catch (err) {
      error("Somethin went wrong.")
    }
  }
}
