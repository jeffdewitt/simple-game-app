import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Game } from 'components'

class GameContainer extends React.Component {
  goToProfile = (e) => {
    e.stopPropagation()
    this.context.router.history.push('/user/' + this.props.game.get('uid'))
  }

  handleClick = (e) => {
    e.stopPropagation()
    this.context.router.history.push('/gameDetail/' + this.props.game.get('gameId'))
  }

  render () {
    return (
      <Game
        goToProfile={this.goToProfile}
        onClick={this.handleClick}
        {...this.props}
      />
    )
  }
}

GameContainer.propTypes = {
  game: PropTypes.object.isRequired
}

GameContainer.defaultProps = {
  hideCommentBtn: false
}

GameContainer.contextTypes = {
  router: PropTypes.object.isRequired
}

function mapStateToProps ({games}, props) {
  return {
    game: games.get(props.gameId)
  }
}

export default connect(mapStateToProps)(GameContainer)
