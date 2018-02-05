import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Navigation } from 'components'
import * as navigationActionCreators from 'redux/modules/navigation'
import * as userActionCreators from 'redux/modules/users'
import { PropTypes } from 'prop-types'

class NavigationContainer extends React.Component {
  static propTypes = {
    toggleMenu: PropTypes.func.isRequired,
    uid: PropTypes.string.isRequired,
    isExpanded: PropTypes.bool.isRequired,
    logoutAndUnauth: PropTypes.func.isRequired
  }

  handleToggleMenu = () => {
    this.props.toggleMenu()
  }

  handleLogout = () => {
    this.props.logoutAndUnauth()
  }

  render () {
    return (
      <Navigation
        handleToggleMenu={this.handleToggleMenu}
        handleLogout={this.handleLogout}
        {...this.props}
      />
    )
  }
}

function mapStateToProps ({users, navigation}) {
  return {
    uid: users.get('authedId'),
    isExpanded: navigation.isExpanded
  }
}

function matchDispatchToProps (dispatch) {
  return bindActionCreators({...navigationActionCreators, ...userActionCreators}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(NavigationContainer)
