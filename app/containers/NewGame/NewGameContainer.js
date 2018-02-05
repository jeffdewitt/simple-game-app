import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { NewGame } from 'components'
import SimpleReactValidator from 'simple-react-validator'
import * as newGameActionCreators from 'redux/modules/newGame'

class NewGameContainer extends React.Component {
  static propTypes = {
    addMainPlayer: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    queryAndHandleGameSearch: PropTypes.func.isRequired,
    addNewPlayer: PropTypes.func.isRequired,
    postAndHandleNewGame: PropTypes.func.isRequired,
    gameSearchText: PropTypes.string.isRequired,
    history: PropTypes.object.isRequired,
    clearNewGameForm: PropTypes.func.isRequired
  }

  constructor () {
    super()
    this.validator = new SimpleReactValidator()
  }

  componentDidMount () {
    this.props.clearNewGameForm()
    this.props.addMainPlayer(this.props.user.get('name'))
  }

  handleGameSearch = () => {
    this.props.queryAndHandleGameSearch(this.props.gameSearchText)
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if (this.validator.allValid()) {
      this.props.postAndHandleNewGame()
        .then(() => {
          this.props.history.push('/dashboard')
        }).catch(() => {
        })
    } else {
      this.validator.showMessages()
      this.forceUpdate()
    }
  }

  render () {
    return (
      <NewGame
        {...this.props}
        handleSubmit={this.handleSubmit}
        handleGameSearch={this.handleGameSearch}
        validator={this.validator}
      />
    )
  }
}

function mapStateToProps ({newGame, users}) {
  return {
    user: users.getIn([users.get('authedId'), 'info']) || {},
    sessionTitle: newGame.get('sessionTitle'),
    gameSearchText: newGame.get('gameSearchText'),
    selectedGame: newGame.get('selectedGame'),
    queriedGames: newGame.get('queriedGames'),
    players: newGame.get('players'),
    isWin: newGame.get('isWin'),
    comments: newGame.get('comments')
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({...newGameActionCreators}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NewGameContainer)
