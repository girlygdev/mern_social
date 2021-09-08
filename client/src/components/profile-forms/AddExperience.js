import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { addExperience } from '../../actions/profile'

const AddExperience = ({ addExperience, history }) => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: ''
  })

  const [toDateDisabled, toggleDisabled] = useState(false)

  const {
    title,
    company,
    location,
    from,
    to,
    current,
    description
  } = formData

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value})
  
  const onCheck = e => {
    console.log(e.target)
  }

  const onSubmit = e => {
    e.preventDefault()
    addExperience(formData, history)
  }

  return (
    <Fragment>
      <h1 className="large text-primary">
       Add An Experience
      </h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>

      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input type="text" placeholder="* Job Title" name="title" required value={title} onChange={onChange} />
        </div>

        <div className="form-group">
          <input type="text" placeholder="* Company" name="company" required value={company} onChange={onChange}/>
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
          }}/> Current Job</p>
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
            placeholder="Job Description"
            value={description} 
            onChange={onChange}></textarea>
        </div>

        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="dashboard">Go Back</Link>
      </form>
    </Fragment>
  )
}

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
}

const mapActionsToProps = {
  addExperience
}

export default connect(null, mapActionsToProps)(withRouter(AddExperience))
