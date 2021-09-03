import { SET_ALERT, REMOVE_ALERT } from '../actions/types'

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = [], action) {
  switch (action.type) {
    case SET_ALERT:
      return [...state, action.payload]
    case REMOVE_ALERT:
      return state.filter(alert => alert.id !== action.payload)
    default:
      return state
  }
}