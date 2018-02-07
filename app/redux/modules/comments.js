import { postComment, fetchComments } from 'helpers/firebaseApi'
import * as types from 'redux/actionTypes'

export function addComment (gameId, comment) {
  return {
    type: types.ADD_COMMENT,
    gameId,
    comment
  }
}

export function addCommentError () {
  return {
    type: types.ADD_COMMENT_ERROR,
    error: 'Error adding comment'
  }
}

export function removeComment (commentId) {
  return {
    type: types.REMOVE_COMMENT,
    commentId
  }
}

export function fetchingComments () {
  return {
    type: types.FETCHING_COMMENTS
  }
}

export function fetchingCommentsError () {
  return {
    type: types.FETCHING_COMMENTS_ERROR,
    error: 'Error fetching comments'
  }
}

export function fetchingCommentsSuccess (gameId, comments) {
  return {
    type: types.FETCHING_COMMENTS_SUCCESS,
    comments,
    gameId,
    lastUpdated: Date.now()
  }
}

export function addAndHandleComment (gameId, comment) {
  return function (dispatch, getState) {
    const { commentWithId, commentPromise } = postComment(gameId, comment)

    dispatch(addComment(gameId, commentWithId))
    commentPromise.catch((error) => {
      dispatch(removeComment(gameId, commentWithId.commentId))
      dispatch(addCommentError(error))
    })
  }
}

export function fetchAndHandleComments (gameId) {
  return function (dispatch) {
    dispatch(fetchingComments(gameId))

    fetchComments(gameId)
      .then((comments) => dispatch(fetchingCommentsSuccess(gameId, comments, Date.now())))
      .catch((error) => dispatch(fetchingCommentsError(error)))
  }
}

const initialComment = {
  name: '',
  comment: '',
  uid: '',
  timestamp: 0,
  avatar: '',
  commentId: ''
}

function gameComments (state = initialComment, action) {
  switch (action.type) {
    case types.ADD_COMMENT :
      return {
        ...state,
        [action.comment.commentId]: action.comment
      }
    case types.REMOVE_COMMENT :
      return {
        ...state,
        [action.comment.commentId]: undefined
      }
    default :
      return state
  }
}

const initialCommentsState = {
  lastUpdated: Date.now(),
  comments: {}
}

function commentsAndLastUpated (state = initialCommentsState, action) {
  switch (action.type) {
    case types.FETCHING_COMMENTS_SUCCESS :
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        comments: action.comments
      }
    case types.ADD_COMMENT :
    case types.REMOVE_COMMENT :
      return {
        ...state,
        comments: gameComments(state.comments, action)
      }
    default :
      return state
  }
}

const initialState = {
  isFetching: false,
  error: ''
}

export default function comments (state = initialState, action) {
  switch (action.type) {
    case types.FETCHING_COMMENTS :
      return {
        ...state,
        isFetching: true
      }
    case types.FETCHING_COMMENTS_ERROR :
    case types.ADD_COMMENT_ERROR :
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
    case types.ADD_COMMENT :
    case types.FETCHING_COMMENTS_SUCCESS :
    case types.REMOVE_COMMENT :
      return {
        ...state,
        isFetching: false,
        error: '',
        [action.gameId]: commentsAndLastUpated(state[action.gameId], action)
      }
    default :
      return state
  }
}
