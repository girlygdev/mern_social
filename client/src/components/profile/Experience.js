import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

const Experience = ({ profile }) => {
  return (
    <div className="profile-exp bg-white p-2">
      <h2 className="text-primary">Experience</h2>

      {profile.experience.map(exp => {
        return <div key={exp._id}>
          <h3 className="text-dark">{exp.company}</h3>
          <p>
            <Moment format='YYYY/MM/DD'>{exp.from}</Moment> - {
              exp.to == null ? 'Present' : <Moment format='YYYY/MM/DD'>{exp.to}</Moment>}
          </p>
          <p><strong>Position: </strong>{exp.title}</p>
          <p>
            <strong>Description: </strong>{exp.description ? exp.description : 'No Experience'}
          </p>
        </div>
      })}
    </div>
  )
}

Experience.propTypes = {
  profile: PropTypes.object.isRequired,
}

export default Experience
