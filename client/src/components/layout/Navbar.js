/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logout } from '../../actions/auth'

const Navbar = ({ auth, onLogout }) => {
  const { isAuthenticated, loading } = auth

  const authLinks = (
    <ul>
      <li><Link to="/posts">Posts</Link></li>
      <li><Link to="/profiles">Developers</Link></li>
      <li>
        <Link to="/dashboard">
          <i className="fas fa-user"></i> {' '}
          <span className="hide-sm">Dashboard</span>
        </Link>
      </li>
      <li>
        <a onClick={onLogout} href={"/login"}>
          <i className="fas fa-sign-out-alt"></i> {' '}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
  )

  const guestLinks = (
    <ul>
      <li><Link to="/profiles">Developers</Link></li>
      <li><Link to="/register">Register</Link></li>
      <li><Link to="/login">Login</Link></li>
      <li><Link to="/profiles">Developers</Link></li>
    </ul>
  )

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code"></i> DevConnector
        </Link>
      </h1>

      { !loading 
        && <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment> }
    </nav>
  )
}

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  onLogout: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth
})

const mapActionsToProps = {
  onLogout: logout
}

export default connect(mapStateToProps, mapActionsToProps)(Navbar)