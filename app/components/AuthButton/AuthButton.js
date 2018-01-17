import React from 'react'
import PropTypes from 'prop-types'

AuthButton.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  onAuth: PropTypes.func.isRequired
}

export default function AuthButton ({onAuth, isFetching}) {
  return (
    <button className={''} onClick={onAuth}>
      {isFetching
        ? 'Loading'
        : 'Login with Google'}
    </button>
  )
}
