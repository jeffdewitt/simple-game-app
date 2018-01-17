import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { link, linkContainer } from './styles.css'

Navigation.propTypes = ActionLinks.propTypes = NavLinks.propTypes = {
  isAuthed: PropTypes.bool.isRequired
}

function NavLinks ({isAuthed}) {
  return isAuthed
    ? <ul className={'col-sm-3 pull-left ' + linkContainer} >
      <li className={link}><Link to="/">Home</Link></li>
    </ul>
    : null
}

function ActionLinks ({isAuthed}) {
  return isAuthed
    ? <ul className={'col-sm-2 pull-right ' + linkContainer} >
      <li className={link}>New Game</li>
      <li className={link}><Link to="/logout">Logout</Link></li>
    </ul>
    : <ul className={'col-sm-2 pull-right ' + linkContainer} >
      <li className={link}><Link to="/">Home</Link></li>
      <li className={link}><Link to="/auth">Login</Link></li>
    </ul>
}

export default function Navigation ({isAuthed}) {
  return (
    <nav className={'row'}>
      <NavLinks isAuthed={isAuthed}/>
      <ActionLinks isAuthed={isAuthed}/>
    </nav>
  )
}
