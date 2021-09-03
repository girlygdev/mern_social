import React from 'react'
import Landing from './components/layout/Landing'
import Navbar from './components/layout/Navbar'
import Alert from './components/layout/Alert'

import Login from './components/auth/Login'
import Register from './components/auth/Register'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { Provider } from 'react-redux'
import store from './store'

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Route exact path='/' component={Landing} />

        <div className="container">
          <Alert />
          <Switch>
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
          </Switch>
        </div>
      </Router>
    </Provider>
  )
}

export default App
