import React from 'react'
import { Navigation } from 'components'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'

class MainContainer extends React.Component {
  render () {
    return (
      <div className={'container'}>
        <Navigation isAuthed={true}/>
        <div className={'row'}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

MainContainer.propTypes = {
  isAuthed: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  children: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
}

MainContainer.contextTypes = {
  router: PropTypes.object.isRequired
}

export default withRouter(connect(
  ({users}) => ({isAuthed: true, isFetching: false}),
  (dispatch) => bindActionCreators({}, dispatch)
)(MainContainer))
