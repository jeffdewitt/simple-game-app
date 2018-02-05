import React from 'react'
import PropTypes from 'prop-types'

Error.propTypes = {
  error: PropTypes.string.isRequired
}

export default function Error ({error}) {
  return error
    ? <div className="col-12 text-center">
      <p className="text-danger">Error: {error}</p>
    </div>
    : null
}
