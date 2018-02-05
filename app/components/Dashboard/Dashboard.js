import React from 'react'
import PropTypes from 'prop-types'
import { Error } from 'components'
import { GameContainer } from 'containers'
import { List } from 'immutable'
import { contentContainer } from '../sharedStyles.css'

NewGamesAvailable.propTypes = {
  handleClick: PropTypes.func.isRequired
}

function NewGamesAvailable ({handleClick}) {
  return (
    <div onClick={handleClick}>
      New Games Available
    </div>
  )
}

Dashboard.propTypes = {
  gameIds: PropTypes.instanceOf(List),
  error: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  newGamesAvailable: PropTypes.bool.isRequired,
  resetNewGamesAvailable: PropTypes.func.isRequired
}

export default function Dashboard (props) {
  return props.isFetching === true
    ? <h1 className="mx-auto">Fetching</h1>
    : <div className={`col-12 col-lg-10 mt-2 ${contentContainer}`}>
      <Error error={props.error}/>
      {props.newGamesAvailable ? <NewGamesAvailable handleClick={props.resetNewGamesAvailable} /> : null}
      {props.gameIds.size === 0
        ? <p>This is unfortunate.<br />It appears there are no games yet.</p>
        : null}
      {props.gameIds.map((id) => (
        <GameContainer
          gameId={id}
          key={id} />
      ))}
    </div>
}
