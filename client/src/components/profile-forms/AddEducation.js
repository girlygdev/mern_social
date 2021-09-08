import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { addEducation } from '../../actions/profile'

const AddEducation = ({ addEducation, history }) => {
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    field_of_study: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: ''
  })

  const [toDateDisabled, toggleDisabled] = useState(false)

  const {
    school,
    degree,
    field_of_study,
    location,
    from,
    to,
    current,
    description
  } = formData

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value})

  const onSubmit = e => {
    e.preventDefault()
    addEducation(formData, history)
  }

  return (
    <Fragment>
      <h1 className="large text-primary">
       Add Your Education
      </h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any school, bootcamp, etc that
        you have attended
      </p>
      <small>* = required field</small>

      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input type="text" placeholder="* School or Bootcamp" name="school"required value={school} onChange={onChange} />
        </div>

        <div className="form-group">
          <input type="text" placeholder="* Degree or Certificate" name="degree" required value={degree} onChange={onChange}/>
        </div>

        <div className="form-group">
          <input type="text" placeholder="Field Of Study" name="field_of_study" required value={field_of_study} onChange={onChange}/>
        </div>

        <div className="form-group">
          <input type="text" placeholder="Location" name="location" value={location} onChange={onChange}/>
        </div>

        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" name="from" value={from} onChange={onChange}/>
        </div>

        <div className="form-group">
          <p><input type="checkbox" name="current" value={current} onChange={() => {
            setFormData({ ...formData, current: !current})
            toggleDisabled(!current)
          }}/> Current School or Bootcamp </p>
        </div>

        <div className="form-group">
          <h4>To Date</h4>
          <input type="date" name="to" value={to} onChange={onChange} disabled={toDateDisabled}/>
        </div>

        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Description"
            value={description} 
            onChange={onChange}></textarea>
        </div>

        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="dashboard">Go Back</Link>
      </form>
    </Fragment>
  )
}

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
}

const mapActionsToProps = {
  addEducation
}

export default connect(null, mapActionsToProps)(withRouter(AddEducation))
