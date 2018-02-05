import React from 'react'
import PropTypes from 'prop-types'
import { Error } from 'components'
import { GameContainer } from 'containers'
import { contentContainer, sorry } from '../sharedStyles.css'
import soSorry from '../../assets/sorry.jpg'

User.propTypes = {
  userEmpty: PropTypes.bool.isRequired,
  noUser: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  gameIds: PropTypes.object.isRequired,
  authedUserName: PropTypes.string.isRequired
}

export default function User (props) {
  const header = props.name === props.authedUserName ? 'Your Games' : props.name + '\'s Games'
  return props.userEmpty
    ? <div className="col-12 col-lg-10 mt-2 text-center">
      <img className={sorry} src={soSorry}/>
      <h4 className="mt-4">Hmmmm... It looks like this user does not exit.</h4>
    </div>
    : <div className={`col-12 col-lg-10 mt-2 ${contentContainer}`}>
      <Error error={props.error}/>
      {props.isFetching === true
        ? <p>Fetching</p>
        : <div>
          <div className="row">
            <h4 className="col-12 text-center">{header}</h4>
          </div>
          {props.gameIds.map((gameId) => (
            <GameContainer
              gameId={gameId}
              key={gameId}
            />
          ))}
          {props.gameIds.length === 0
            ? <p>
              {`It looks like ${props.name.split(' ')[0]} has't made any games yet.`}
            </p>
            : null }
        </div>}
    </div>
}
