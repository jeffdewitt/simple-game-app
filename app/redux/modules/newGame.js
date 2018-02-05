import { queryGames } from 'helpers/bggApi'
import { saveGame } from 'helpers/firebaseApi'
import { addGame } from 'redux/modules/games'
import { formatNewGame } from 'helpers/utils'
import { fromJS } from 'immutable'

const UPDATE_SESSION_TITLE = 'UPDATE_SESSION_TITLE'
const UPDATE_SEARCH_TEXT = 'UPDATE_SEARCH_TEXT'
const QUERYING_GAMES = 'QUERYING_GAMES'
const QUERYING_GAMES_SUCCESS = 'QUERYING_GAMES_SUCCESS'
const QUERYING_GAMES_ERROR = 'QUERYING_GAMES_ERROR'
const UPDATE_SELECTED_GAME = 'UPDATE_SELECTED_GAME'
const ADD_PLAYER = 'ADD_PLAYER'
const ADD_MAIN_PLAYER = 'ADD_MAIN_PLAYER'
const UPDATE_PLAYER = 'UPDATE_PLAYER'
const SAVING_GAME = 'SAVING_GAME'
const SAVING_GAME_SUCCESS = 'SAVING_GAME_SUCCESS'
const SAVING_GAME_ERROR = 'SAVING_GAME_ERROR'
const CLEAR_NEW_GAME_FORM = 'CLEAR_NEW_GAME_FORM'
const UPDATE_IS_WIN = 'UPDATE_IS_WIN'
const UPDATE_COMMENTS = 'UPDATE_COMMENTS'
const REMOVE_PLAYER = 'REMOVE_PLAYER'

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
    type: SAVING_GAME
  }
}

function savingGameSuccess () {
  return {
    type: SAVING_GAME_SUCCESS
  }
}

function savingGameError (error) {
  return {
    type: SAVING_GAME_ERROR,
    error
  }
}

export function clearNewGameForm () {
  return {
    type: CLEAR_NEW_GAME_FORM
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
    type: QUERYING_GAMES
  }
}

function queryingGamesSuccess (queriedGames) {
  const firstGame = queriedGames[0] || {}
  return {
    type: QUERYING_GAMES_SUCCESS,
    queriedGames,
    selectedGame: firstGame.name || '',
    selectedGameId: firstGame.id || ''
  }
}

function queryingGamesError (error) {
  return {
    type: QUERYING_GAMES_ERROR,
    error: error
  }
}

export function updateGameSearchText (newGameSearchText) {
  return {
    type: UPDATE_SEARCH_TEXT,
    newGameSearchText
  }
}

export function updateSessionTitle (newSessionTitle) {
  return {
    type: UPDATE_SESSION_TITLE,
    newSessionTitle
  }
}

export function updateSelectedGame ({name, id}) {
  return {
    type: UPDATE_SELECTED_GAME,
    name,
    id
  }
}

export function updatePlayer (updatedPlayer, updatedPlayerIndex) {
  return {
    type: UPDATE_PLAYER,
    updatedPlayer,
    updatedPlayerIndex
  }
}

export function addNewPlayer () {
  return {
    type: ADD_PLAYER
  }
}

export function removePlayer (index) {
  return {
    type: REMOVE_PLAYER,
    index
  }
}

export function addMainPlayer (name) {
  return {
    type: ADD_MAIN_PLAYER,
    name
  }
}

export function updateIsWin (isWin) {
  return {
    type: UPDATE_IS_WIN,
    isWin
  }
}

export function updateComments (comments) {
  return {
    type: UPDATE_COMMENTS,
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
    case UPDATE_SESSION_TITLE :
      return state.merge({
        sessionTitle: action.newSessionTitle
      })
    case UPDATE_SEARCH_TEXT :
      return state.merge({
        gameSearchText: action.newGameSearchText
      })
    case UPDATE_SELECTED_GAME :
      return state.merge({
        selectedGame: action.name,
        selectedGameId: action.id
      })
    case QUERYING_GAMES :
      return state.merge({
        isQuerying: true
      })
    case QUERYING_GAMES_SUCCESS :
      return state.merge({
        error: '',
        isQuerying: false,
        queriedGames: action.queriedGames,
        selectedGame: action.selectedGame,
        selectedGameId: action.selectedGameId
      })
    case QUERYING_GAMES_ERROR :
      return state.merge({
        isQuerying: false,
        error: action.error
      })
    case ADD_MAIN_PLAYER :
      return state.merge({
        players: state.get('players').push(action.name)
      })
    case ADD_PLAYER :
      return state.merge({
        players: state.get('players').push('')
      })
    case REMOVE_PLAYER :
      return state.merge({
        players: state.get('players').delete(action.index)
      })
    case UPDATE_PLAYER :
      return state.merge({
        players: state.get('players').update(action.updatedPlayerIndex, val => action.updatedPlayer)
      })
    case SAVING_GAME :
      return state.merge({
        isSaving: true
      })
    case SAVING_GAME_SUCCESS :
      return state.merge({
        ...initialState
      })
    case SAVING_GAME_ERROR :
      return state.merge({
        isSaving: false,
        error: action.error
      })
    case UPDATE_IS_WIN :
      return state.merge({
        isWin: action.isWin
      })
    case UPDATE_COMMENTS :
      return state.merge({
        comments: action.comments
      })
    case CLEAR_NEW_GAME_FORM :
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
