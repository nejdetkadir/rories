export default function ({ store, redirect }) {
  if (store.state.users.current_user != null) {
    return redirect('/home')
  }
}
