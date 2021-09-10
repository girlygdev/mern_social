/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getProfileById } from '../../actions/profile'
import Spinner from '../layout/Spinner'
import About from './About'
import Info from './Info'
import Experience from './Experience'
import Education from './Education'
import GithubRepo from './GithubRepo'

const Profile = ({ 
  match: { params: { userId } }, 
  profile: { profile, loading },
  auth,
  getProfileById
}) => {

  useEffect(() => {
    getProfileById(userId)
  }, [getProfileById, userId])

  return (
    <Fragment>
      {loading || profile == null
        ? <Spinner />
        : <Fragment>
          <Link to="/profiles" className="btn btn-light">Back To Profiles</Link>
          { auth.isAuthenticated && auth.loading === false && auth.user._id === userId
            ? <Link to="/edit-profile" className="btn btn-dark">Edit Profile</Link> : '' }
          
          <div className="profile-grid my-1">                      
            <Info profile={profile} />
            <About profile={profile} />
            <Experience profile={profile} />
            <Education profile={profile} />
            {profile.githubusername ? <GithubRepo username={profile.githubusername} /> : ''}
          </div>
        </Fragment>}
    </Fragment>
  )
}

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
})

const mapActionsToProps = {
  getProfileById
}

export default connect(mapStateToProps, mapActionsToProps)(withRouter(Profile))
