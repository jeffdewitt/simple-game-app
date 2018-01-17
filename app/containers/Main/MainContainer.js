import React from 'react'
import { Navigation } from 'components'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import * as userActionCreators from 'redux/modules/users'
import { formatUserInfo } from 'helpers/utils'
import { firebaseAuth } from 'config/constants'

class MainContainer extends React.Component {
  static propTypes = {
    isAuthed: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    authUser: PropTypes.func.isRequired,
    fetchingUserSuccuess: PropTypes.func.isRequired,
    removeFetchingUser: PropTypes.func.isRequired,
    children: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  componentDidMount () {
    firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        const userData = user.providerData[0]
        const userInfo = formatUserInfo(userData)
        this.props.authUser(userInfo.uid)
        this.props.fetchingUserSuccuess(userInfo.uid, userInfo, Date.now())
        if (this.props.location.pathname === '/') {
          this.context.router.history.replace('feed')
        }
      } else {
        this.props.removeFetchingUser()
      }
    })
  }

  render () {
    return (
      <div className={'container'}>
        <Navigation isAuthed={this.props.isAuthed}/>
        <div className={'row'}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default withRouter(connect(
  ({users}) => ({isAuthed: users.isAuthed, isFetching: users.isFetching}),
  (dispatch) => bindActionCreators({...userActionCreators}, dispatch)
)(MainContainer))
