import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../../actions/auth'
import PropTypes from 'prop-types'

const Login = ({ onLoginUser, isAuthenticated }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const onSubmit = e => {
    e.preventDefault()
    onLoginUser(email, password);
  }

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />
  }

  return (
    <div>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead"><i className="fas fa-user"></i> Sign into Your Account</p>
      
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="register">Sign Up</Link>
      </p>
    </div>
  )
}

Login.propTypes = {
  onLoginUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

const mapActionsToProps = {
  onLoginUser: login
}


export default connect(mapStateToProps, mapActionsToProps)(Login)
