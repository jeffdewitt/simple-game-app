import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { GameDetails } from 'components'
import * as gameActionCreators from 'redux/modules/games'
import * as commentsActionCreators from 'redux/modules/comments'

class GameDetailsContainer extends React.Component {
  componentDidMount () {
    if (this.props.gamesAlreadyFetched === false) {
      this.props.fetchAndHandleGame(this.props.gameId)
    } else {
      this.props.removeFetching()
    }
  }

  render () {
    return (
      <GameDetails
        authedUser={this.props.authedUser}
        gameId={this.props.gameId}
        error={this.props.error}
        isFetching={this.props.isFetching}
        addAndHandleComment={this.props.addAndHandleComment}
      />
    )
  }
}

GameDetailsContainer.propTypes = {
  authedUser: PropTypes.object.isRequired,
  gameId: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  gamesAlreadyFetched: PropTypes.bool.isRequired,
  removeFetching: PropTypes.func.isRequired,
  fetchAndHandleGame: PropTypes.func.isRequired,
  addAndHandleComment: PropTypes.func.isRequired
}

function mapStateToProps ({games, users}, props) {
  const user = users.get(users.get('authedId'))
  const userInfo = user.get('info')
  return {
    isFetching: games.get('isFetching'),
    error: games.get('error'),
    authedUser: userInfo,
    gameId: props.match.params.gameId,
    gamesAlreadyFetched: !!games.get(props.match.params.gameId)
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    ...gameActionCreators,
    ...commentsActionCreators}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GameDetailsContainer)
