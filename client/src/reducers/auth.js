import {
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  AUTH_ERROR,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
} from '../actions/types'

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      // save to local storage
      localStorage.setItem('token', payload.token)

      return {
        ...state,
        ...payload, // spread token
        isAuthenticated: true,
        loading: false
      }

    case REGISTER_FAILED:
    case LOGIN_FAILED:
      localStorage.removeItem('token')

      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false
      }

    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload
      }

    case AUTH_ERROR:
      localStorage.removeItem('token')

      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null
      }

    default:
      return state
  }
}