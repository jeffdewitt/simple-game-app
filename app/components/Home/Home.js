import React from 'react'
import { homeContainer } from './styles.css'

export default function Home (props) {
  return (
    <div className={'row'}>
      <div className={'col-sm-6 col-sm-offset-3 ' + homeContainer}>
        <h3>Track Your wins and losses</h3>
        <p>It will let you know who is best at games</p>
      </div>
    </div>
  )
}
