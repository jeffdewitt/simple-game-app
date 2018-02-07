import { fetchUsersGames } from 'helpers/firebaseApi'
import { addGames } from 'redux/modules/games'
import { fromJS } from 'immutable'
import * as types from 'redux/actionTypes'

function fetchingUsersGames (uid) {
  return {
    type: types.FETCHING_USERS_GAMES,
    uid
  }
}

function fetchingUsersGamesError () {
  return {
    type: types.FETCHING_USERS_GAMES_ERROR,
    error: 'Error fetching Users Game Ids'
  }
}

function fetchingUsersGamesSuccess (uid, gameIds, lastUpdated) {
  return {
    type: types.FETCHING_USERS_GAMES_SUCCESS,
    uid,
    gameIds,
    lastUpdated
  }
}

export function addSingleUsersGame (uid, gameId) {
  return {
    type: types.ADD_SINGLE_USERS_GAME,
    uid,
    gameId
  }
}

export function fetchAndHandleUsersGames (uid) {
  return function (dispatch) {
    dispatch(fetchingUsersGames(uid))
    return fetchUsersGames(uid)
      .then((games) => dispatch(addGames(games)))
      .then(({games}) => dispatch(
        fetchingUsersGamesSuccess(
          uid,
          Object.keys(games).sort((a, b) => games[b].timestamp - games[a].timestamp),
          Date.now())))
      .catch((error) => dispatch(fetchingUsersGamesError(error)))
  }
}

const initialUsersGameState = fromJS({
  lastUpdated: 0,
  gameIds: []
})

function usersGame (state = initialUsersGameState, action) {
  switch (action.type) {
    case types.ADD_SINGLE_USERS_GAME :
      return state.merge({
        gameIds: state.get('gameIds').concat([action.gameId])
      })
    default :
      return state
  }
}

const initialState = fromJS({
  isFetching: true,
  error: ''
})

export default function usersGames (state = initialState, action) {
  switch (action.type) {
    case types.FETCHING_USERS_GAMES :
      return state.merge({
        isFetching: true
      })
    case types.FETCHING_USERS_GAMES_ERROR :
      return state.merge({
        isFetching: false,
        error: action.error
      })
    case types.FETCHING_USERS_GAMES_SUCCESS :
      return state.merge({
        isFetching: false,
        error: '',
        [action.uid]: {
          lastUpdated: action.lastUpdated,
          gameIds: action.gameIds
        }
      })
    case types.ADD_SINGLE_USERS_GAME :
      return typeof state[action.uid] === 'undefined'
        ? state
        : state.merge({
          isFetching: false,
          error: '',
          [action.uid]: usersGame(state[action.uid], action)
        })
    default :
      return state
  }
}
