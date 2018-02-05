import React from 'react'
import { homeContainer } from './styles.css'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

Home.propTypes = {
  isAuthed: PropTypes.bool.isRequired,
  handleAuth: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired
}

export default function Home ({isAuthed, handleAuth, error, isFetching}) {
  const buttonText = isFetching ? 'Logging in...' : 'Log in With Google to Get Started'
  return (
    <div className="row">
      <div className={`col-6 offset-3 offset-lg-2 text-center ${homeContainer}`}>
        <h2>Game Tracker</h2>
        <h3>Track Your wins and losses</h3>
        <p>It will let you know who is best at games</p>
        {isAuthed
          ? <Link to='newgame'>
            <button className='btn btn-secondary'>Now go make a new game!</button>
          </Link>
          : <button onClick={handleAuth} className="btn btn-secondary">{buttonText}</button>}
      </div>
      {error ? <p>{error}</p> : null}
    </div>
  )
}
