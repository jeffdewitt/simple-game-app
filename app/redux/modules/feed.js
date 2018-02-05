import { addListener } from 'redux/modules/listeners'
import { listenToFeed } from 'helpers/firebaseApi'
import { addGames } from 'redux/modules/games'
import { fromJS } from 'immutable'

const SETTING_FEED_LISTENER = 'SETTING_FEED_LISTENER'
const SETTING_FEED_LISTENER_ERROR = 'SETTING_FEED_LISTENER_ERROR'
const SETTING_FEED_LISTENER_SUCCESS = 'SETTING_FEED_LISTENER_SUCCESS'
const ADD_NEW_GAME_ID_TO_FEED = 'ADD_NEW_GAME_ID_TO_FEED'
const RESET_NEW_GAMES_AVAILABLE = 'RESET_NEW_GAMES_AVAILABLE'

function settingFeedListener () {
  return {
    type: SETTING_FEED_LISTENER
  }
}

function settingFeedListenerError () {
  return {
    type: SETTING_FEED_LISTENER_ERROR,
    error: 'Error fetching feeds.'
  }
}

function settingFeedListenerSuccess (gameIds) {
  return {
    type: SETTING_FEED_LISTENER_SUCCESS,
    gameIds
  }
}

function addNewGameIdToFeed (gameId) {
  return {
    type: ADD_NEW_GAME_ID_TO_FEED,
    gameId
  }
}

export function resetNewGamesAvailable () {
  return {
    type: RESET_NEW_GAMES_AVAILABLE
  }
}

export function setAndHandleFeedListener () {
  let initialFetch = true
  return function (dispatch, getState) {
    if (getState().listeners.feed) {
      return
    }
    dispatch(addListener('feed'))
    dispatch(settingFeedListener())

    listenToFeed((feed, sortedIds) => {
      dispatch(addGames(feed))
      initialFetch === true
        ? dispatch(settingFeedListenerSuccess(sortedIds))
        : dispatch(addNewGameIdToFeed(sortedIds[0]))
    }, (error) => dispatch(settingFeedListenerError(error)))
  }
}

const initialState = fromJS({
  newGamesAvailable: false,
  newGamesToAdd: [],
  isFetching: false,
  error: '',
  gameIds: []
})

export default function feed (state = initialState, action) {
  switch (action.type) {
    case SETTING_FEED_LISTENER :
      return state.merge({
        isFetching: true
      })
    case SETTING_FEED_LISTENER_ERROR :
      return state.merge({
        isFetching: false,
        error: action.error
      })
    case SETTING_FEED_LISTENER_SUCCESS :
      return state.merge({
        isFetching: false,
        error: '',
        gameIds: action.gameIds,
        newGamesAvailable: false
      })
    case ADD_NEW_GAME_ID_TO_FEED :
      return state.merge({
        newGamesToAdd: state.get('newGamessToAdd').unshift(action.gameId)
      })
    case RESET_NEW_GAMES_AVAILABLE :
      return state.merge({
        gameIds: state.get('newGamesToAdd').concat(state.get('gameIds')),
        newGamesToAdd: [],
        newGamesAvailable: false
      })
    default :
      return state
  }
}
