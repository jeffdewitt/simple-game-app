import { addListener } from 'redux/modules/listeners'
import { listenToFeed } from 'helpers/firebaseApi'
import { addGames } from 'redux/modules/games'
import { fromJS } from 'immutable'
import * as types from 'redux/actionTypes'

function settingFeedListener () {
  return {
    type: types.SETTING_FEED_LISTENER
  }
}

function settingFeedListenerError () {
  return {
    type: types.SETTING_FEED_LISTENER_ERROR,
    error: 'Error fetching feeds.'
  }
}

function settingFeedListenerSuccess (gameIds) {
  return {
    type: types.SETTING_FEED_LISTENER_SUCCESS,
    gameIds
  }
}

function addNewGameIdToFeed (gameId) {
  return {
    type: types.ADD_NEW_GAME_ID_TO_FEED,
    gameId
  }
}

export function resetNewGamesAvailable () {
  return {
    type: types.RESET_NEW_GAMES_AVAILABLE
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
    case types.SETTING_FEED_LISTENER :
      return state.merge({
        isFetching: true
      })
    case types.SETTING_FEED_LISTENER_ERROR :
      return state.merge({
        isFetching: false,
        error: action.error
      })
    case types.SETTING_FEED_LISTENER_SUCCESS :
      return state.merge({
        isFetching: false,
        error: '',
        gameIds: action.gameIds,
        newGamesAvailable: false
      })
    case types.ADD_NEW_GAME_ID_TO_FEED :
      return state.merge({
        newGamesToAdd: state.get('newGamessToAdd').unshift(action.gameId)
      })
    case types.RESET_NEW_GAMES_AVAILABLE :
      return state.merge({
        gameIds: state.get('newGamesToAdd').concat(state.get('gameIds')),
        newGamesToAdd: [],
        newGamesAvailable: false
      })
    default :
      return state
  }
}
