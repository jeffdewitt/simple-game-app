import React from 'react'
import PropTypes from 'prop-types'
import { AuthButton } from 'components'

Auth.propTypes = {
  error: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  onAuth: PropTypes.func.isRequired
}

export default function Auth ({error, isFetching, onAuth}) {
  return (
    <div className={''}>
      <h1 className={''}>Authenticate</h1>
      <AuthButton isFetching={isFetching} onAuth={onAuth} />
      {error ? <p className={''}>{error}</p> : null}
    </div>
  )
}
