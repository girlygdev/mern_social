import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getProfileById } from '../../actions/profile'
import { Link } from 'react-router-dom'

const ProfileItem = ({ profile, getProfileById }) => profile && (
  <div className="profile bg-light">
    <img
      className="round-img"
      src={ profile.user.avatar }
      alt={ profile.user.name }
    />
    <div>
      <h2>{ profile.user.name }</h2>
      <p>{ profile.status } { profile.company && <span>at { profile.company } </span> } </p>
      <p>{ profile.location }</p>
      <Link to={`/profile/${profile.user._id}`} className="btn btn-primary">View Profile</Link>
    </div>

    <ul>
      {profile.skills.slice(0,4).map((skill, index) => (
        <li className="text-primary" key={index}>
          <i className="fas fa-check"></i> {skill}
        </li>
      ))}
    </ul>
  </div>
)

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
}

export default connect(null, { getProfileById })(ProfileItem)
