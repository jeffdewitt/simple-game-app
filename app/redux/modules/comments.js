import { postComment, fetchComments } from 'helpers/firebaseApi'

const FETCHING_COMMENTS = 'FETCHING_COMMENTS'
const FETCHING_COMMENTS_ERROR = 'FETCHING_COMMENTS_ERROR'
const FETCHING_COMMENTS_SUCCESS = 'FETCHING_COMMENTS_SUCCESS'
const ADD_COMMENT = 'ADD_COMMENT'
const ADD_COMMENT_ERROR = 'ADD_COMMENT_ERROR'
const REMOVE_COMMENT = 'REMOVE_COMMENT'

function addComment (gameId, comment) {
  return {
    type: ADD_COMMENT,
    gameId,
    comment
  }
}

function addCommentError () {
  return {
    type: ADD_COMMENT_ERROR,
    error: 'Error adding comment'
  }
}

function removeComment (gameId, commentId) {
  return {
    type: REMOVE_COMMENT,
    commentId
  }
}

function fetchingComments () {
  return {
    type: FETCHING_COMMENTS
  }
}

function fetchingCommentsError () {
  return {
    type: FETCHING_COMMENTS_ERROR,
    error: 'Error fetching comments'
  }
}

function fetchingCommentsSuccess (gameId, comments) {
  return {
    type: FETCHING_COMMENTS_SUCCESS,
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
    case ADD_COMMENT :
      return {
        ...state,
        [action.comment.commentId]: action.comment
      }
    case REMOVE_COMMENT :
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
    case FETCHING_COMMENTS_SUCCESS :
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        comments: action.comments
      }
    case ADD_COMMENT :
    case REMOVE_COMMENT :
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
    case FETCHING_COMMENTS :
      return {
        ...state,
        isFetching: true
      }
    case FETCHING_COMMENTS_ERROR :
    case ADD_COMMENT_ERROR :
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
    case ADD_COMMENT :
    case FETCHING_COMMENTS_SUCCESS :
    case REMOVE_COMMENT :
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
