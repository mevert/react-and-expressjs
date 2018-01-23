import config from '../../config'

const { restaurantsApi } = config

const getRestaurantOpeningHours = restaurantId =>
  `${restaurantsApi}/restaurants/${restaurantId}/hours`

export default {
  getRestaurantOpeningHours
}
