export const actions = {
  async nuxtServerInit () {
    // start backend because if it's not receiving requests for a long time, heroku closes it
    try {
      await this.$axios.get("/users/sign_in")
    } catch (err) {
      
    }
  }
}
