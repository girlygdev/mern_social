import { combineReducers } from "redux"
import alerts from './alert'
import auth from './auth'
import profile from './profile'
import post from './post'

export default combineReducers({
  auth,
  alerts,
  profile,
  post,
})