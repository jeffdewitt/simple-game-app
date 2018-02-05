import { fetchGame } from 'helpers/firebaseApi'
import { Map } from 'immutable'

const FETCHING_GAME = 'FETCHING_GAME'
const FETCHING_GAME_ERROR = 'FETCHING_GAME_ERROR'
const FETCHING_GAME_SUCCESS = 'FETCHING_GAME_SUCCESS'
const ADD_GAME = 'ADD_GAME'
const ADD_MULTIPLE_GAMES = 'ADD_MULTIPLE_GAMES'
const REMOVE_FETCHING = 'REMOVE_FETCHING'

function fetchingGame () {
  return {
    type: FETCHING_GAME
  }
}

function fetchingGameError () {
  return {
    type: FETCHING_GAME_ERROR,
    error: 'Error fetching Game'
  }
}

function fetchingGameSuccess (game) {
  return {
    type: FETCHING_GAME_SUCCESS,
    game
  }
}

export function removeFetching () {
  return {
    type: REMOVE_FETCHING
  }
}

export function addGame (game) {
  return {
    type: ADD_GAME,
    game
  }
}

export function addGames (games) {
  return {
    type: ADD_MULTIPLE_GAMES,
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
    case FETCHING_GAME :
      return state.merge({
        isFetching: true
      })
    case ADD_GAME :
    case FETCHING_GAME_SUCCESS :
      return state.merge({
        error: '',
        isFetching: false,
        [action.game.gameId]: action.game
      })
    case FETCHING_GAME_ERROR :
      return state.merge({
        isFetching: false,
        error: action.error
      })
    case REMOVE_FETCHING :
      return state.merge({
        error: '',
        isFetching: false
      })
    case ADD_MULTIPLE_GAMES :
      return state.merge({
        ...action.games,
        isFetching: false
      })
    default :
      return state
  }
}
