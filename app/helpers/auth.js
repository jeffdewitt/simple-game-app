import { ref, firebaseAuth } from 'config/constants'

export function auth () {
  return firebaseAuth().signInWithPopup(new firebaseAuth.GoogleAuthProvider())
}

export function checkIfAuthed (store) {
  return store.getState().users.isAuthed
}

export function logout () {
  return firebaseAuth().signOut()
}

export function saveUser (user) {
  return ref.child(`users/${user.uid}`)
    .set(user)
    .then(() => user)
}
