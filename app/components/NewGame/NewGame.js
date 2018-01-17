import React from 'react'
import PropTypes from 'prop-types'

Home.propTypes = {
  titleText: PropTypes.string.isRequired,
  searchText: PropTypes.string.isRequired,
  updateGameTitle: PropTypes.func.isRequired,
  updateGameSearch: PropTypes.func.isRequired
}

export default function Home (props) {
  return (
    <div className={'row'}>
      <div className={'row'}>
        <input
          onChange={(e) => props.updateGameTitle(e.target.value)}
          value={props.titleText}
          type='text'
        />
        <input
          onChange={(e) => props.updateGameSearch(e.target.value)}
          value={props.searchText}
          type='text'
        />
      </div>

    </div>
  )
}
