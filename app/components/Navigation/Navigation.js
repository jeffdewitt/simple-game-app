import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { innerNav, defaultState, expandState, navBtn } from './styles.css'
import { hideLg } from '../sharedStyles.css'
import menu from '../../assets/menu.png'

Navigation.propTypes = {
  uid: PropTypes.string.isRequired,
  handleToggleMenu: PropTypes.func.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  handleLogout: PropTypes.func.isRequired
}

export default function Navigation ({uid, handleToggleMenu, isExpanded, handleLogout}) {
  const expand = isExpanded ? expandState : ''

  return (
    <div className={`${innerNav} ${defaultState} ${expand}`}>
      <button
        onClick={handleToggleMenu}
        className={`btn btn-link ${hideLg} ${navBtn}`}><img src={menu}/></button>
      <h4 className="mt-2 text-center page-header">Game Tracker</h4>
      <ul className="list-group" onClick={handleToggleMenu}>
        <Link to="/dashboard"><li className="list-group-item">Dashbboard</li></Link>
        <Link to={`/user/${uid}`}><li className="list-group-item">My Games</li></Link>
        <Link to="/newgame"><li className="list-group-item">New Game</li></Link>
        <Link to="/"><li className="list-group-item" onClick={handleLogout}>Logout</li></Link>
      </ul>
    </div>
  )
}
