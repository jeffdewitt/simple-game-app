import React from 'react'
import { sorry } from '../sharedStyles.css'
import soSorry from '../../assets/sorry.jpg'

export default function NotFound () {
  return (
    <div className="col-12 col-lg-10 mt-4 text-center">
      <img className={sorry} src={soSorry}/>
      <h4 className="mt-4">We cannot seem to find what your are requesting.</h4>
    </div>
  )
}
