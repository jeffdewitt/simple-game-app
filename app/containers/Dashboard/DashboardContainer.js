import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Dashboard } from 'components'
import * as feedActionListeners from 'redux/modules/feed'
import { List } from 'immutable'

class DashboardContainer extends React.Component {
  componentDidMount () {
    this.props.setAndHandleFeedListener()
  }

  render () {
    return (
      <Dashboard
        newGamesAvailable={this.props.newGamesAvailable}
        error={this.props.error}
        isFetching={this.props.isFetching}
        gameIds={this.props.gameIds}
        resetNewGamesAvailable={this.props.resetNewGamesAvailable}
      />
    )
  }
}

DashboardContainer.propTypes = {
  gameIds: PropTypes.instanceOf(List),
  newGamesAvailable: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  setAndHandleFeedListener: PropTypes.func.isRequired,
  resetNewGamesAvailable: PropTypes.func.isRequired
}

function mapStateToProps ({feed}) {
  return {
    newGamesAvailable: feed.get('newGamesAvailable'),
    error: feed.get('error'),
    isFetching: feed.get('isFetching'),
    gameIds: feed.get('gameIds')
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(feedActionListeners, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer)
