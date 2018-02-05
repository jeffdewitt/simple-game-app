import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Comments } from 'components'
import * as commentsActionCreators from 'redux/modules/comments'
import { isStale } from 'helpers/utils'

class CommentsContainer extends React.Component {
  componentDidMount () {
    if (isStale(this.props.lastUpdated)) {
      this.props.fetchAndHandleComments(this.props.gameId)
    }
  }

  render () {
    return (
      <Comments
        isFetching={this.props.isFetching}
        error={this.props.error}
        lastUpdated={this.props.lastUpdated}
        comments={this.props.comments}
      />
    )
  }
}

CommentsContainer.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  lastUpdated: PropTypes.number.isRequired,
  comments: PropTypes.object.isRequired,
  gameId: PropTypes.string.isRequired,
  fetchAndHandleComments: PropTypes.func.isRequired
}

CommentsContainer.defaultProps = {
  lastUpdated: 0,
  comments: {}
}

function mapStateToProps (state, props) {
  const gameCommentsInfo = state.comments[props.gameId] || {}
  const { lastUpdated, comments } = gameCommentsInfo
  return {
    isFetching: state.comments.isFetching,
    error: state.comments.error,
    lastUpdated,
    comments
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(commentsActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentsContainer)
