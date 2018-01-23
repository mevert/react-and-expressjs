import { createAction } from 'redux-actions'

const getOpeningHours = createAction('RESTAURANTS__GET_OPENING_HOURS')
const getOpeningHoursSuccess = createAction('RESTAURANTS__GET_OPENING_HOURS_SUCCESS')
const getOpeningHoursFail = createAction('RESTAURANTS__GET_OPENING_HOURS_FAIL')

export {
  getOpeningHours,
  getOpeningHoursSuccess,
  getOpeningHoursFail
}
