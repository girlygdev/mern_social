import { SET_ALERT, REMOVE_ALERT } from "./types"
import { v4 as uuidv4 } from 'uuid'

export const setAlert = (msg, alertType, timeout = 5000) => dispatch => {
  const id = uuidv4()

  dispatch({
    type: SET_ALERT,
    payload: {
      id,
      msg,
      alertType
    }
  })

  setTimeout(() => dispatch(removeAlert(id)), timeout)
}

export const removeAlert = (id) => dispatch => {
  dispatch({
    type: REMOVE_ALERT,
    payload: id
  })
}