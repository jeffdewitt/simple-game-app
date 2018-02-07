import * as actions from 'redux/modules/comments'
import * as types from 'redux/actionTypes'
import { postComment, fetchComments } from 'helpers/firebaseApi'

jest.mock('helpers/firebaseApi', () => ({
  postComment: jest.fn(),
  fetchComments: jest.fn()
}))

describe('actions', () => {
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
})

describe('actions', () => {
  it('should create an action to add an error', () => {
    const error = 'Error adding comment'
    const expectedAction = {
      type: types.ADD_COMMENT_ERROR,
      error
    }
    expect(actions.addCommentError()).toEqual(expectedAction)
  })
})

describe('actions', () => {
  it('should create an action to remove a comment', () => {
    const commentId = '456'
    const expectedAction = {
      type: types.REMOVE_COMMENT,
      commentId
    }
    expect(actions.removeComment(commentId)).toEqual(expectedAction)
  })
})

describe('actions', () => {
  it('should create an action to fetch comments', () => {
    const expectedAction = {
      type: types.FETCHING_COMMENTS
    }
    expect(actions.fetchingComments()).toEqual(expectedAction)
  })
})

describe('actions', () => {
  it('should create an action to add an error when fetching comments', () => {
    const error = 'Error fetching comments'
    const expectedAction = {
      type: types.FETCHING_COMMENTS_ERROR,
      error
    }
    expect(actions.fetchingCommentsError()).toEqual(expectedAction)
  })
})

describe('actions', () => {
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
