import React, { useState } from 'react'
import { Link, Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import { setAlert } from '../../actions/alert'
import { register } from '../../actions/auth'

import PropTypes from 'prop-types'

const Register = ({ onSetAlert, onRegister, isAuthenticated }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const onSubmitForm = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      onSetAlert('Passwords did not match', 'danger')
      return false
    }

    const data = {
      name,
      email,
      password
    }

    onRegister(data)
  }

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />
  }

  return (
    <div>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form className="form">
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            minLength="6"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={onSubmitForm}>
          Register
        </button>
      </form>
      <p className="my-1">
        Already have an account? <Link to="login">Sign In</Link>
      </p>
    </div>
  )
}

Register.propTypes = {
  onSetAlert: PropTypes.func.isRequired,
  onRegister: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})
  
const mapActionsToProps = {
  onSetAlert: setAlert,
  onRegister: register,
}

export default connect(mapStateToProps, mapActionsToProps)(Register)
