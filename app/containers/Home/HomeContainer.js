import React from 'react'
import { Home } from 'components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import * as userActionCreators from 'redux/modules/users'

class HomeContainer extends React.Component {
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
        this.context.router.history.replace('dashboard')
      })
  }

  render () {
    return (
      <Home
        handleAuth={this.handleAuth}
        {...this.props}/>
    )
  }
}

function mapStateToProps ({users}) {
  return {
    isAuthed: users.isAuthed,
    isFetching: users.isFetching,
    error: users.error
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(userActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)
