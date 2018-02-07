import { queryGames } from 'helpers/bggApi'
import { saveGame } from 'helpers/firebaseApi'
import { addGame } from 'redux/modules/games'
import { formatNewGame } from 'helpers/utils'
import { fromJS } from 'immutable'
import * as types from 'redux/actionTypes'

export function postAndHandleNewGame () {
  return function (dispatch, getState) {
    dispatch(savingGame())
    const users = getState().users
    const authedUser = users.get(users.get('authedId'))
    const formattedGame = formatNewGame(getState().newGame, authedUser.get('info'))
    return saveGame(formattedGame)
      .then((savedGame) => {
        dispatch(addGame(savedGame))
        dispatch(clearNewGameForm())
        dispatch(savingGameSuccess())
      })
      .catch((error) => {
        dispatch(savingGameError(error))
      })
  }
}

function savingGame () {
  return {
    type: types.SAVING_GAME
  }
}

function savingGameSuccess () {
  return {
    type: types.SAVING_GAME_SUCCESS
  }
}

function savingGameError (error) {
  return {
    type: types.SAVING_GAME_ERROR,
    error
  }
}

export function clearNewGameForm () {
  return {
    type: types.CLEAR_NEW_GAME_FORM
  }
}

export function queryAndHandleGameSearch (searchText) {
  return function (dispatch) {
    dispatch(queryingGames())
    queryGames(searchText)
      .then((games) => dispatch(queryingGamesSuccess(games)))
      .catch((error) => dispatch(queryingGamesError(error)))
  }
}

function queryingGames () {
  return {
    type: types.QUERYING_GAMES
  }
}

function queryingGamesSuccess (queriedGames) {
  const firstGame = queriedGames[0] || {}
  return {
    type: types.QUERYING_GAMES_SUCCESS,
    queriedGames,
    selectedGame: firstGame.name || '',
    selectedGameId: firstGame.id || ''
  }
}

function queryingGamesError (error) {
  return {
    type: types.QUERYING_GAMES_ERROR,
    error: error
  }
}

export function updateGameSearchText (newGameSearchText) {
  return {
    type: types.UPDATE_SEARCH_TEXT,
    newGameSearchText
  }
}

export function updateSessionTitle (newSessionTitle) {
  return {
    type: types.UPDATE_SESSION_TITLE,
    newSessionTitle
  }
}

export function updateSelectedGame ({name, id}) {
  return {
    type: types.UPDATE_SELECTED_GAME,
    name,
    id
  }
}

export function updatePlayer (updatedPlayer, updatedPlayerIndex) {
  return {
    type: types.UPDATE_PLAYER,
    updatedPlayer,
    updatedPlayerIndex
  }
}

export function addNewPlayer () {
  return {
    type: types.ADD_PLAYER
  }
}

export function removePlayer (index) {
  return {
    type: types.REMOVE_PLAYER,
    index
  }
}

export function addMainPlayer (name) {
  return {
    type: types.ADD_MAIN_PLAYER,
    name
  }
}

export function updateIsWin (isWin) {
  return {
    type: types.UPDATE_IS_WIN,
    isWin
  }
}

export function updateComments (comments) {
  return {
    type: types.UPDATE_COMMENTS,
    comments
  }
}

const initialState = fromJS({
  sessionTitle: '',
  gameSearchText: '',
  selectedGame: '',
  selectedGameId: '',
  players: [],
  queriedGames: [],
  isQuerying: false,
  isWin: false,
  isSaving: false,
  error: '',
  comments: ''
})

export default function newGame (state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_SESSION_TITLE :
      return state.merge({
        sessionTitle: action.newSessionTitle
      })
    case types.UPDATE_SEARCH_TEXT :
      return state.merge({
        gameSearchText: action.newGameSearchText
      })
    case types.UPDATE_SELECTED_GAME :
      return state.merge({
        selectedGame: action.name,
        selectedGameId: action.id
      })
    case types.QUERYING_GAMES :
      return state.merge({
        isQuerying: true
      })
    case types.QUERYING_GAMES_SUCCESS :
      return state.merge({
        error: '',
        isQuerying: false,
        queriedGames: action.queriedGames,
        selectedGame: action.selectedGame,
        selectedGameId: action.selectedGameId
      })
    case types.QUERYING_GAMES_ERROR :
      return state.merge({
        isQuerying: false,
        error: action.error
      })
    case types.ADD_MAIN_PLAYER :
      return state.merge({
        players: state.get('players').push(action.name)
      })
    case types.ADD_PLAYER :
      return state.merge({
        players: state.get('players').push('')
      })
    case types.REMOVE_PLAYER :
      return state.merge({
        players: state.get('players').delete(action.index)
      })
    case types.UPDATE_PLAYER :
      return state.merge({
        players: state.get('players').update(action.updatedPlayerIndex, val => action.updatedPlayer)
      })
    case types.SAVING_GAME :
      return state.merge({
        isSaving: true
      })
    case types.SAVING_GAME_SUCCESS :
      return state.merge({
        ...initialState
      })
    case types.SAVING_GAME_ERROR :
      return state.merge({
        isSaving: false,
        error: action.error
      })
    case types.UPDATE_IS_WIN :
      return state.merge({
        isWin: action.isWin
      })
    case types.UPDATE_COMMENTS :
      return state.merge({
        comments: action.comments
      })
    case types.CLEAR_NEW_GAME_FORM :
      return state.merge({
        sessionTitle: '',
        gameSearchText: '',
        selectedGame: '',
        selectedGameId: '',
        players: [],
        queriedGames: [],
        isQuerying: false,
        isWin: false,
        isSaving: false,
        error: '',
        comments: ''
      })
    default :
      return state
  }
}
