import { ref } from 'config/constants'
import { fetchGameData } from 'helpers/bggApi'

function saveToGames (game) {
  const gameId = ref.child('games').push().key
  const gamePromise = ref.child(`games/${gameId}`).set({...game, gameId})
  return {
    gameId,
    gamePromise
  }
}

function saveGameToUser (game, gameId) {
  return ref.child(`usersGames/${game.uid}/${gameId}`)
    .set({
      ...game,
      gameId
    })
}

export function saveGame (game) {
  return fetchGameData(game.selectedGameId)
    .then(({thumbnail, image, description}) => {
      const gameWithDetails = {
        ...game,
        thumbnail: thumbnail._text,
        image: image._text,
        description: description._text
      }

      const { gameId, gamePromise } = saveToGames(gameWithDetails)
      return Promise.all([
        gamePromise,
        saveGameToUser(gameWithDetails, gameId)
      ])
    })
    .then(() => {
      return {...game}
    })
    .catch((error) => error)
}

export function listenToFeed (callback, errorCallback) {
  ref.child('games').on('value', (snapshot) => {
    const feed = snapshot.val() || {}
    const sortedIds = Object.keys(feed).sort((a, b) => feed[b].timestamp - feed[a].timestamp)
    callback(feed, sortedIds)
  }, errorCallback)
}

export function fetchUser (uid) {
  return ref.child(`users/${uid}`).once('value')
    .then((snapshot) => snapshot.val() || {})
    .catch((error) => error)
}

export function fetchUsers () {
  return ref.child(`users`).once('value')
    .then((snapshot) => snapshot.val() || {})
}

export function fetchUsersGames (uid) {
  return ref.child(`usersGames/${uid}`).once('value')
    .then((snapshot) => snapshot.val() || {})
}

export function fetchGame (gameId) {
  return ref.child(`games/${gameId}`).once('value')
    .then((snapshot) => snapshot.val() || {})
}

export function postComment (gameId, comment) {
  const commentId = ref.child(`comments/${gameId}`).push().key
  const commentWithId = {...comment, commentId}
  const commentPromise = ref.child(`comments/${gameId}/${commentId}`).set(commentWithId)
  return {commentWithId, commentPromise}
}

export function fetchComments (gameId) {
  return ref.child(`comments/${gameId}`).once('value')
    .then((snapshot) => snapshot.val() || {})
}
