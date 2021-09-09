import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getCurrentProfile, deleteAccount } from '../../actions/profile'
import Spinner from '../layout/Spinner'
import { Link } from 'react-router-dom'
import DashboardActions from './DashboardActions'
import Experience from './Experience'
import Education from './Education'

const Dashboard = ({ profile: { profile, loading }, auth: { user }, getCurrentProfile, deleteAccount }) => { 
  useEffect(() => {
    getCurrentProfile()
  }, [getCurrentProfile])


  return loading && profile == null 
    ? <Spinner />
    : <Fragment>
      <h1 className="large text-primary">
        Dashboard
      </h1>

      <p className="lead">
        <i className="fas fa-user">
          Welcome { user && user.name}
        </i>
      </p>

      { profile !== null
        ? <Fragment>
            <DashboardActions />
            {profile.experience.length ? <Experience experience={profile.experience}/> : ''}
            {profile.education.length ? <Education education={profile.education} /> : ''}

            <button onClick={() => deleteAccount(user._id)} className="btn btn-danger my-2">
              <i className="fas fa-user-minus"></i>  Delete Account
            </button>
          </Fragment>
        : <Fragment>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="create-profile" className="btn btn-primary my-1">
              Create Profile
            </Link>
          </Fragment>}
    </Fragment>
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
})

const mapActionsToProps = {
  getCurrentProfile,
  deleteAccount
}

export default connect(mapStateToProps, mapActionsToProps)(Dashboard)
