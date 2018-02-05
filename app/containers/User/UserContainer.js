import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { User } from 'components'
import * as usersActionCreators from 'redux/modules/users'
import * as usersGamesActionCreators from 'redux/modules/usersGames'
import { isStale, isEmpty } from 'helpers/utils'

class UserContainer extends React.Component {
  static propTypes = {
    userEmpty: PropTypes.bool.isRequired,
    noUser: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    gameIds: PropTypes.object.isRequired,
    fetchAndHandleUsersGames: PropTypes.func.isRequired,
    fetchAndHandelUser: PropTypes.func.isRequired,
    lastUpdatedUser: PropTypes.number.isRequired,
    lastUpdatedGames: PropTypes.number.isRequired,
    match: PropTypes.object.isRequired,
    authedUserName: PropTypes.string.isRequired
  }

  componentDidMount () {
    const uid = this.props.match.params.uid
    if (this.props.noUser === true || isStale(this.props.lastUpdatedUser)) {
      this.props.fetchAndHandelUser(uid)
    }

    if (this.props.noUser === true || isStale(this.props.lastUpdatedGames)) {
      this.props.fetchAndHandleUsersGames(uid)
    }
  }

  render () {
    return (
      <User
        userEmpty={this.props.userEmpty}
        noUser={this.props.noUser}
        name={this.props.name}
        authedUserName={this.props.authedUserName}
        isFetching={this.props.isFetching}
        error={this.props.error}
        gameIds={this.props.gameIds}
      />
    )
  }
}

function mapStateToProps ({users, usersGames}, props) {
  const specificUsersGames = usersGames.get(props.match.params.uid)
  const user = users.get(props.match.params.uid)
  const noUser = typeof user === 'undefined'
  const userEmpty = (user && isEmpty(user.get('info')))
  const authedUser = users.get(users.get('authedId'))
  const authedUserName = authedUser.getIn(['info', 'name'])
  // console.log(specificUsersGames.get('gameIds'))
  return {
    userEmpty,
    noUser,
    name: noUser === true ? '' : user.getIn(['info', 'name']),
    isFetching: users.get('isFetching') || usersGames.get('isFetching'),
    error: users.get('error') || usersGames.get('error'),
    gameIds: specificUsersGames ? specificUsersGames.get('gameIds') : {},
    lastUpdatedUser: user ? user.get('lastUpdated') : 0,
    lastUpdatedGames: specificUsersGames ? specificUsersGames.get('lastUpdated') : 0,
    authedUserName
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    ...usersActionCreators,
    ...usersGamesActionCreators
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer)
