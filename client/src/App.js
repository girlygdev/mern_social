import React from 'react'
import Landing from './components/layout/Landing'
import Navbar from './components/layout/Navbar'
import Login from './components/auth/Login'
import Register from './components/auth/Register'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const App = () => {
  return (
    <React.Fragment>
      <Router>
        <Navbar />
        <Route exact path='/' component={Landing} />
        
        <div className="container">
          <Switch>
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
          </Switch>
        </div>
      </Router>
    </React.Fragment>
  )
}

export default App
