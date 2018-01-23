import { handleActions } from 'redux-actions'
import uuid from 'uuid/v4'
import { getOpeningHoursSuccess, getOpeningHoursFail } from '../actions/restaurant'

// this is just a mock implementation with random id for restaurant
const id = uuid()

const initialState = {
  openingHours: [],
  id
}

const restaurant = handleActions({
  [getOpeningHoursSuccess]: {
    next (state, { payload }) {
      return {
        ...state,
        openingHours: payload
      }
    }
  },
  [getOpeningHoursFail]: {
    next (state, { payload }) {
      return {
        ...state,
        errorMessage: payload
      }
    }
  }
}, initialState)

export default restaurant
