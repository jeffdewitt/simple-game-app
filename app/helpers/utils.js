export function formatUserInfo ({displayName, photoURL, uid}) {
  return {
    name: displayName,
    avatar: photoURL,
    uid
  }
}

export function formatNewGame (newGame, user) {
  return {
    sessionTitle: newGame.get('sessionTitle'),
    selectedGameId: newGame.get('selectedGameId'),
    selectedGame: newGame.get('selectedGame'),
    players: newGame.get('players').toJS(),
    isWin: newGame.get('isWin'),
    comments: newGame.get('comments'),
    name: user.get('name'),
    avatar: user.get('avatar'),
    uid: user.get('uid'),
    timestamp: Date.now()
  }
}

export function formatComment (user, comment) {
  return {
    name: user.get('name'),
    comment: comment,
    uid: user.get('uid'),
    avatar: user.get('avatar'),
    timestamp: Date.now()
  }
}

export function formatTimeStamp (timestamp) {
  const date = new Date(timestamp)
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
}

function getMilliseconds (timestamp) {
  return new Date().getTime() - new Date(timestamp).getTime()
}

export function isStale (timestamp) {
  return getMilliseconds(timestamp) > 100000
}

export function isEmpty (obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false
    }
  }

  return true
}
