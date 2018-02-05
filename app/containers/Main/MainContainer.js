import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import * as userActionCreators from 'redux/modules/users'
import * as navigationActionCreators from 'redux/modules/navigation'
import { formatUserInfo } from 'helpers/utils'
import { firebaseAuth } from 'config/constants'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { HomeContainer, AuthContainer, NewGameContainer, NavigationContainer,
  DashboardContainer, GameDetailsContainer, UserContainer, NotFoundContainer } from 'containers'
import { menuBtn, topNav } from './styles.css'
import { hideLg } from 'components/sharedStyles.css'
import menu from '../../assets/menu.png'

class MainContainer extends React.Component {
  static propTypes = {
    isAuthed: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    authUser: PropTypes.func.isRequired,
    fetchingUserSuccuess: PropTypes.func.isRequired,
    removeFetchingUser: PropTypes.func.isRequired,
    toggleMenu: PropTypes.func.isRequired
  }

  componentDidMount () {
    firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        const userInfo = formatUserInfo(user)
        this.props.authUser(userInfo.uid)
        this.props.fetchingUserSuccuess(userInfo.uid, userInfo, Date.now())
      } else {
        this.props.removeFetchingUser()
      }
    })
  }

  render () {
    return this.props.isFetching === true
      ? null
      : (
        <Router>
          <div className={'container-fluid'}>
            <div className="row">
              <div className="col-0 col-lg-2 p-0">
                {this.props.isAuthed && <NavigationContainer/>}
              </div>
              <div className="col-12 col-lg-10">
                {this.props.isAuthed && <div className={`row ${hideLg}`}>
                  <div className={`col-12 col-lg-10 mb-2 text-center ${topNav}`}>
                    <button
                      className={`btn btn-link float-left ${menuBtn}`}
                      onClick={this.props.toggleMenu}><img src={menu}/></button>
                    <h4 className="p-3">Game Tracker</h4>
                  </div>
                </div>}
                <Switch>
                  <Route exact={true} path="/" component={HomeContainer}/>
                  <Route path="/auth" component={AuthContainer}/>
                  {this.props.isAuthed && <Route path="/newgame" component={NewGameContainer}/>}
                  {this.props.isAuthed && <Route path="/dashboard" component={DashboardContainer}/>}
                  {this.props.isAuthed && <Route path="/gameDetail/:gameId" component={GameDetailsContainer}/>}
                  {this.props.isAuthed && <Route path="/user/:uid" component={UserContainer}/>}
                  <Route component={NotFoundContainer}/>
                </Switch>
              </div>
            </div>
          </div>
        </Router>
      )
  }
}

export default connect(
  ({users}) => ({isAuthed: users.get('isAuthed'), isFetching: users.get('isFetching')}),
  (dispatch) => bindActionCreators({...userActionCreators, ...navigationActionCreators}, dispatch)
)(MainContainer)
