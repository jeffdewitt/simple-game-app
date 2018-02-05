import React from 'react'
import PropTypes from 'prop-types'
import { Error } from 'components'
import { GameContainer, CommentsContainer } from 'containers'
import { formatComment } from 'helpers/utils'
import { contentContainer } from '../sharedStyles.css'

Comment.propTypes = {
  submit: PropTypes.func.isRequired
}

function Comment ({submit}) {
  function handleSubmit (e) {
    if (Comment.ref.value.length === 0) {
      return
    }

    submit(Comment.ref.value, e)
    Comment.ref.value = ''
  }

  return (
    <div className="row">
      <div className={`col-12 pt-2`}>
        <textarea
          className="form-control col-12"
          ref={(ref) => { Comment.ref = ref }}
          maxLength={140}
          placeholder='Leave a comment!'
          type='text'
        />
        <button className="btn btn-secondary mt-2" onClick={handleSubmit}>
          Leave Comment
        </button>
      </div>
    </div>
  )
}

GameDetails.propTypes = {
  authedUser: PropTypes.object.isRequired,
  gameId: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  addAndHandleComment: PropTypes.func.isRequired
}

export default function GameDetails ({gameId, isFetching, authedUser, error, addAndHandleComment}) {
  return (
    <div>
      {isFetching === true
        ? <p>Fetching</p>
        : <div>
          <div className={`col-12 col-lg-10 mt-2 ${contentContainer}`}>
            <Error error={error}/>
            <GameContainer gameId={gameId} hideCommentBtn={true}/>
            <div className="row">
              <div className="col-12">
                <Comment submit={(commentText) => addAndHandleComment(gameId, formatComment(authedUser, commentText))}/>
                <CommentsContainer gameId={gameId}/>
              </div>
            </div>
          </div>
        </div>}
    </div>
  )
}
