import React from 'react'
import PropTypes from 'prop-types'
import { formatTimeStamp } from 'helpers/utils'
import { commentContainer, commentText, commentSection } from './styles.css'
import { avatar } from '../sharedStyles.css'

Comment.propTypes = {
  comment: PropTypes.object.isRequired
}

function Comment ({comment}) {
  return (
    <div className={`row pt-2 pb-2 ${commentContainer}`}>
      <div className="col-12">
        <div className="row">
          <img className={`col-2 ${avatar}`} src={comment.avatar} alt={comment.name}/>
          <div className={`col-10 ${commentSection}`}>
            <div className="row">
              <h4 className="col-6">{comment.name}</h4>
              <div className="col-6"><span className="float-right">{formatTimeStamp(comment.timestamp)}</span></div>
            </div>
            <div className={`pl-2 pr-2 ${commentText}`}>
              {comment.comment}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Comments.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  comments: PropTypes.object
}

export default function Comments ({isFetching, error, comments}) {
  const commentIds = Object.keys(comments)
  return (
    <div className="row pt-1">
      {error ? <h3>{error}</h3> : null}
      {isFetching === true
        ? <p>Fetching Comments</p>
        : <div className="col-12">
          <h1 className="m-0">Comments</h1>
          {commentIds.map((commentId) => {
            return (
              <Comment key={commentId} comment={comments[commentId]}/>
            )
          })}
        </div>}
      {commentIds.length === 0 ? <h3>Be the first to comment!</h3> : null}
    </div>
  )
}
