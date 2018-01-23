// when implementing more complicated selectors I recommend reselect

const getOpeningHours = state => state.restaurant.openingHours
const getErrorMessage = state => state.restaurant.errorMessage
const getRestaurantId = state => state.restaurant.id

export {
  getOpeningHours,
  getErrorMessage,
  getRestaurantId
}
