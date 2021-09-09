import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

const Education = ({ profile }) => {
  return (
    <div className="profile-edu bg-white p-2">
      <h2 className="text-primary">Education</h2>
      {profile.education.length ? profile.education.map(educ => {
        return <div key={educ._id}>
          <h3 className="text-dark">{educ.school}</h3>
          <p>
            <Moment format='YYYY/MM/DD'>{educ.from}</Moment> - {
              educ.to == null ? 'Present' : <Moment format='YYYY/MM/DD'>{educ.to}</Moment>}
          </p>
          <p><strong>Field of Study: </strong>{educ.fieldofstudy}</p>
          <p>
            <strong>Description: </strong>{educ.description ? educ.description : 'No Education'}
          </p>
        </div>
      }) : <h4>No Education Credentials</h4>}
    </div>
  )
}

Education.propTypes = {
  profile: PropTypes.object.isRequired,
}

export default Education
