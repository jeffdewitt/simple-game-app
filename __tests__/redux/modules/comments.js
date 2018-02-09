import * as actions from 'redux/modules/comments'
import * as types from 'redux/actionTypes'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const commentsReducer = actions.default
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const mockComment = {
  name: 'zip',
  comment: 'ghjkll',
  uid: '12345',
  timestamp: Date.now(),
  avatar: 'something',
  commentId: '234'
}

jest.mock('helpers/firebaseApi', () => ({
  postComment: jest.fn(() => {
    return {
      commentWithId: mockComment,
      commentPromise: Promise.resolve('a thing')
    }
  }),
  fetchComments: jest.fn(() => Promise.resolve('a thing'))
}))

describe('actions', () => {
  it('should dispatch actions when fetching comments', () => {
    const store = mockStore()

    const expectedActions = [
      { type: types.FETCHING_COMMENTS },
      { type: types.FETCHING_COMMENTS_SUCCESS, comments: 'a thing', gameId: '234', lastUpdated: Date.now() }
    ]

    return store.dispatch(actions.fetchAndHandleComments('234')).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('should dispatch actions when adding a new comment', () => {
    const store = mockStore()

    const expectedActions = [
      { type: types.ADD_COMMENT, comment: mockComment, gameId: '234' }
    ]

    return store.dispatch(actions.addAndHandleComment('234')).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('should create an action to add a comment', () => {
    const comment = 'a comment'
    const gameId = '123'
    const expectedAction = {
      type: types.ADD_COMMENT,
      gameId,
      comment
    }
    expect(actions.addComment(gameId, comment)).toEqual(expectedAction)
  })

  it('should create an action to add an error', () => {
    const error = 'Error adding comment'
    const expectedAction = {
      type: types.ADD_COMMENT_ERROR,
      error
    }
    expect(actions.addCommentError()).toEqual(expectedAction)
  })

  it('should create an action to remove a comment', () => {
    const commentId = '456'
    const expectedAction = {
      type: types.REMOVE_COMMENT,
      commentId
    }
    expect(actions.removeComment(commentId)).toEqual(expectedAction)
  })

  it('should create an action to fetch comments', () => {
    const expectedAction = {
      type: types.FETCHING_COMMENTS
    }
    expect(actions.fetchingComments()).toEqual(expectedAction)
  })

  it('should create an action to add an error when fetching comments', () => {
    const error = 'Error fetching comments'
    const expectedAction = {
      type: types.FETCHING_COMMENTS_ERROR,
      error
    }
    expect(actions.fetchingCommentsError()).toEqual(expectedAction)
  })

  it('should create an action when comments are successfully added', () => {
    const lastUpdated = Date.now()
    const gameId = '789'
    const comments = ['one', 'two']
    const expectedAction = {
      type: types.FETCHING_COMMENTS_SUCCESS,
      gameId,
      lastUpdated,
      comments
    }
    expect(actions.fetchingCommentsSuccess(gameId, comments)).toEqual(expectedAction)
  })
})

describe('comments reducer', () => {
  it('should return the initial state', () => {
    expect(commentsReducer(undefined, {})).toEqual({
      error: '',
      isFetching: false
    })
  })

  it('should handle FETCHING_COMMENTS', () => {
    expect(
      commentsReducer(undefined, {
        type: types.FETCHING_COMMENTS
      })
    ).toEqual({
      error: '',
      isFetching: true
    })
  })
})
