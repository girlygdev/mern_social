import { 
  ACCOUNT_DELETED, 
  CLEAR_PROFILE, 
  GET_PROFILE, 
  PROFILE_ERROR, 
  UPDATE_PROFILE,
  GET_PROFILES,
  GET_REPOS } from "./types"
import { setAlert } from './alert'
import axios from 'axios'

// Get current user profile
export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get('/api/profile/me')

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    })
  } catch (error) {
    const errorData = error.response.data
    console.log('ERROR:::' + error.response.data)

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: errorData.msg, status: error.response.status}
    }) 
  }
}

// Get all user profiles
export const getProfiles = () => async dispatch => {
  dispatch({ type: CLEAR_PROFILE })

  try {
    const res = await axios.get('/api/profile/all')

    dispatch({
      type: GET_PROFILES,
      payload: res.data
    })
  } catch (error) {
    const errorData = error.response
    console.log('ERROR:::' + error.response)
  }
}

// Get all user profiles by user ID
export const getProfileById = ( userId ) => async dispatch => {
  dispatch({ type: CLEAR_PROFILE })
  
  try {
    const res = await axios.get(`/api/profile/user/${userId}`)

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    })
  } catch (error) {
    const errorData = error.response
    console.log('ERROR:::' + error.response)
  }
}

// Get github repos
export const getGithubRepos = ( username ) => async dispatch => {  
  try {
    const res = await axios.get(`/api/profile/github/${username}`)

    dispatch({
      type: GET_REPOS,
      payload: res.data
    })
  } catch (error) {
    const errorData = error.response.data
    console.log('ERROR:::' + error.response.data)
  }
}

export const updateCurrentProfile = (data, history, edit = false) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const body = JSON.stringify(data)

    const res = await axios.post('/api/profile', body, config)

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    })

    dispatch(setAlert(edit ? 'Profile updated.' : 'Profile created.', 'success'))
    history.push('/dashboard')
  } catch (error) {
    const errorData = error.response.data
    console.log('ERROR:::' + error)

    if (typeof errorData === 'object') {
      if (errorData.errors) {
        errorData.errors.forEach(err => {          
          dispatch(setAlert(err.msg, 'danger'))        
        });
      }
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: errorData.msg, status: error.response.status}
    }) 
  }
}

export const addExperience = (data, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const body = JSON.stringify(data)

    const res = await axios.put('/api/profile/experience', body, config)

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    })

    dispatch(setAlert('Experience Added', 'success'))
    history.push('/dashboard')
  } catch (error) {
    const errorData = error.response.data
    console.log('ERROR:::' + error)

    if (typeof errorData === 'object') {
      if (errorData.errors) {
        errorData.errors.forEach(err => {          
          dispatch(setAlert(err.msg, 'danger'))        
        });
      }
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status}
    }) 
  }
}

export const addEducation = (data, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const body = JSON.stringify(data)

    const res = await axios.put('/api/profile/education', body, config)

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    })

    dispatch(setAlert('Education Added', 'success'))
    history.push('/dashboard')
  } catch (error) {
    const errorData = error.response.data
    console.log('ERROR:::' + error)

    if (typeof errorData === 'object') {
      if (errorData.errors) {
        errorData.errors.forEach(err => {          
          dispatch(setAlert(err.msg, 'danger'))        
        });
      }
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status}
    }) 
  }
}

export const deleteExperience = (id) => async dispatch => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`)
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    })

    dispatch(setAlert('Experience deleted', 'success'))
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status}
    }) 
  }
}

export const deleteEducation = (id) => async dispatch => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`)
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    })

    dispatch(setAlert('Education deleted', 'success'))
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status}
    }) 
  }
}

export const deleteAccount = () => async dispatch => {
  if (window.confirm('Are you sure? This action is irreversible')) {
    try {
      const res = await axios.delete(`/api/profile`)

      dispatch({ type: CLEAR_PROFILE })
      dispatch({ type: ACCOUNT_DELETED})
  
      dispatch(setAlert('Account deleted', 'success'))
    } catch (error) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: error.response.statusText, status: error.response.status}
      }) 
    }
  }  
}