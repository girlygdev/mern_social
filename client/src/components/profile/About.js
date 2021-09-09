import React from 'react'
import PropTypes from 'prop-types'

const About = ({ profile }) => {
  return (
    <div className="profile-about bg-light p-2">
      <h2 className="text-primary">{profile.user.name}'s Bio</h2>
      <p>
        {profile.bio}
      </p>
      <div className="line"></div>
      <h2 className="text-primary">Skill Set</h2>
      <div className="skills">
        {profile.skills.slice(0, 4).map((skill, index) => (
          <div className="p-1" key={index}>
            <i className="fas fa-check"></i> {skill}
          </div>
        ))}
      </div>
    </div>
  )
}

About.propTypes = {
  profile: PropTypes.object.isRequired,
}

export default About
