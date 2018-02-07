import { fetchGame } from 'helpers/firebaseApi'
import { Map } from 'immutable'
import * as types from 'redux/actionTypes'

function fetchingGame () {
  return {
    type: types.FETCHING_GAME
  }
}

function fetchingGameError () {
  return {
    type: types.FETCHING_GAME_ERROR,
    error: 'Error fetching Game'
  }
}

function fetchingGameSuccess (game) {
  return {
    type: types.FETCHING_GAME_SUCCESS,
    game
  }
}

export function removeFetching () {
  return {
    type: types.REMOVE_FETCHING
  }
}

export function addGame (game) {
  return {
    type: types.ADD_GAME,
    game
  }
}

export function addGames (games) {
  return {
    type: types.ADD_MULTIPLE_GAMES,
    games
  }
}

export function fetchAndHandleGame (gameId) {
  return function (dispatch) {
    dispatch(fetchingGame())
    fetchGame(gameId)
      .then((game) => dispatch(fetchingGameSuccess(game)))
      .catch((error) => dispatch(fetchingGameError(error)))
  }
}

const initialState = Map({
  isFetching: true,
  error: ''
})

export default function games (state = initialState, action) {
  switch (action.type) {
    case types.FETCHING_GAME :
      return state.merge({
        isFetching: true
      })
    case types.ADD_GAME :
    case types.FETCHING_GAME_SUCCESS :
      return state.merge({
        error: '',
        isFetching: false,
        [action.game.gameId]: action.game
      })
    case types.FETCHING_GAME_ERROR :
      return state.merge({
        isFetching: false,
        error: action.error
      })
    case types.REMOVE_FETCHING :
      return state.merge({
        error: '',
        isFetching: false
      })
    case types.ADD_MULTIPLE_GAMES :
      return state.merge({
        ...action.games,
        isFetching: false
      })
    default :
      return state
  }
}
