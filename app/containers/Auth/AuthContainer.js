import React from 'react'
import PropTypes from 'prop-types'
import { Auth } from 'components'
import { connect } from 'react-redux'
import * as userActionCreators from 'redux/modules/users'
import { bindActionCreators } from 'redux'

class AuthContainer extends React.Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    fetchAndHandelAuthedUser: PropTypes.func.isRequired
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  handleAuth = (e) => {
    e.preventDefault()
    this.props.fetchAndHandelAuthedUser()
      .then(() => {
        this.context.router.history.replace('feed')
      })
  }

  render () {
    return (
      <Auth
        isFetching={this.props.isFetching}
        error={this.props.error}
        onAuth={this.handleAuth} />
    )
  }
}

function mapStateToProps (state) {
  return {
    isFetching: false,  //TODO; change to actual state later
    error: state.users.error
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(userActionCreators, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthContainer)
