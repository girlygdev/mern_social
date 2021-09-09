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

const Profile = ({ match: { params: { userId } }, profile: { profile, loading }, getProfileById }) => {

  useEffect(() => {
    getProfileById(userId)
  }, [getProfileById, userId])

  return (
    <Fragment>
      {loading && profile == null
        ? <Spinner />
        : <Fragment>
          <Link to="/profiles" className="btn btn-light">Back To Profiles</Link>
          <div className="profile-grid my-1">                      
            <Info profile={profile} />
            <About profile={profile} />
            <Experience profile={profile} />
            <Education profile={profile} />
            
            <div className="profile-github">
              <h2 className="text-primary my-1">
                <i className="fab fa-github"></i> Github Repos
              </h2>
              <div className="repo bg-white p-1 my-1">
                <div>
                  <h4><a href="#" target="_blank"
                    rel="noopener noreferrer">Repo One</a></h4>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Repellat, laborum!
                  </p>
                </div>
                <div>
                  <ul>
                    <li className="badge badge-primary">Stars: 44</li>
                    <li className="badge badge-dark">Watchers: 21</li>
                    <li className="badge badge-light">Forks: 25</li>
                  </ul>
                </div>
              </div>
              <div className="repo bg-white p-1 my-1">
                <div>
                  <h4><a href="#" target="_blank"
                    rel="noopener noreferrer">Repo Two</a></h4>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Repellat, laborum!
                  </p>
                </div>
                <div>
                  <ul>
                    <li className="badge badge-primary">Stars: 44</li>
                    <li className="badge badge-dark">Watchers: 21</li>
                    <li className="badge badge-light">Forks: 25</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Fragment>}
    </Fragment>
  )
}

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  profile: state.profile
})

const mapActionsToProps = {
  getProfileById
}

export default connect(mapStateToProps, mapActionsToProps)(withRouter(Profile))
