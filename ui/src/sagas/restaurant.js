import { takeLatest, put, call, select } from 'redux-saga/effects'
import {
  getOpeningHours,
  getOpeningHoursSuccess,
  getOpeningHoursFail
} from '../actions/restaurant'
import { getRestaurantId } from '../selectors/restaurant'

import Api from '../services/api/restaurants'

export function * handleGetOpeningHours () {
  try {
    const restaurantId = yield select(getRestaurantId)
    const openingHours = yield call(Api.getRestaurantOpeningHours, restaurantId)
    yield put(getOpeningHoursSuccess(openingHours))
  } catch (error) {
    yield put(getOpeningHoursFail(error.message))
  }
}

function * watchRestaurantsActions () {
  yield takeLatest(getOpeningHours, handleGetOpeningHours)
}

export default [
  watchRestaurantsActions
]
