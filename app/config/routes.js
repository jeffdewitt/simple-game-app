import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { MainContainer, HomeContainer } from 'containers'

export default function getRoutes () {
  return (
    <Router>
      <MainContainer>
        <Switch>
          <Route exact={true} path="/" component={HomeContainer}/>
        </Switch>
      </MainContainer>
    </Router>
  )
}
