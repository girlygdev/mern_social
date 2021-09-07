import {
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT
} from './types'
import { setAlert } from './alert'
import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'

export const loadUser = () => async dispatch => {
  const token = localStorage.getItem('token')

  if (token) {
    setAuthToken(token)
  }

  try {
    const res = await axios.get('/api/auth')

    dispatch ({
      type: USER_LOADED,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: AUTH_ERROR
    })
  }
}

export const register = ({ name, email, password }) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const body = JSON.stringify({ name, email, password})

    const res = await axios.post('/api/users', body, config)

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    })

    dispatch(loadUser())

    console.log(res.data)
  } catch (error) {
    const errorData = error.response.data
    console.log('ERROR:::' + error.response.data)

    if (typeof errorData === 'object') {
      if (errorData.errors.length) {
        errorData.errors.forEach(err => {          
          dispatch(setAlert(err.msg, 'danger'))        
        });
      }
    }

    dispatch({
      type: REGISTER_FAILED
    })    
  }
}

export const login = (email, password) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const body = JSON.stringify({ email, password})

    const res = await axios.post('/api/auth', body, config)

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    })
  } catch (error) {
    const errorData = error.response.data
    console.log('ERROR:::' + error.response.data)

    if (typeof errorData === 'object') {
      if (errorData.errors.length) {
        errorData.errors.forEach(err => {          
          dispatch(setAlert(err.msg, 'danger'))        
        });
      }
    }

    dispatch({
      type: LOGIN_FAILED
    })  
  }
}

export const logout = () => dispatch => {
  dispatch({
    type: LOGOUT
  })
}