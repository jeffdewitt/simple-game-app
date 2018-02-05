import React from 'react'
import PropTypes from 'prop-types'
import { formatTimeStamp } from 'helpers/utils'
import { Map } from 'immutable'
import { playerHeader, gameContainer, gameDetails } from './styles.css'
import { avatar } from '../sharedStyles.css'

export default function Game (props) {
  const headlineEnd = props.game.get('isWin') ? ' and won!' : '.'
  const bggLink = `https://boardgamegeek.com/boardgame/${props.game.get('selectedGameId')}`
  const otherPlayerCount = props.game.get('players').size - 1
  const comment = props.game.get('comment') || ''
  const players = props.game.get('players').join(', ')
  const sessionTitle = props.game.get('sessionTitle')

  return (
    <div className="row">
      <div className={`col-12 p-0 mb-1 mt-1 ${gameContainer}`}>
        <div className={`p-1 ${playerHeader}`}>
          <img className={`col-1 ${avatar}`} src={props.game.get('avatar')} onClick={props.goToProfile}/>
          <span className={`col-11`}>{`${props.game.get('name')} played a game of ${props.game.get('selectedGame') + headlineEnd}`}</span>
        </div>
        <div className={`p-1 ${gameDetails}`}>
          <div className="col-3 text-center">
            <img src={props.game.get('thumbnail')}/>
            <div><a href={bggLink}>Check it out on BGG.com.</a></div>
          </div>
          <div className="col-9">
            <div className="row pb-2">
              <h4 className="col-6 m-0 p-0">{props.game.get('selectedGame')}</h4>
              <div className="col-6">
                <span className="float-right">{formatTimeStamp(props.game.get('timestamp'))}</span>
              </div>
            </div>
            {props.hideCommentBtn === true
              ? <div className={`col-12`}>
                <h5>Session: {sessionTitle}</h5>
                <p>Players: {players}</p>
                {comment ? <p>{comment}</p> : null}
              </div>
              : <div className="text-center">
                <div>{otherPlayerCount} other players joined in on this game.</div>
                <button className="btn btn-info mt-4" onClick={props.onClick}>Check out the details or leave a comment</button>
              </div>}
          </div>
        </div>
      </div>
    </div>
  )
}

Game.propTypes = {
  game: PropTypes.instanceOf(Map),
  onClick: PropTypes.func,
  goToProfile: PropTypes.func.isRequired,
  hideCommentBtn: PropTypes.bool.isRequired
}
