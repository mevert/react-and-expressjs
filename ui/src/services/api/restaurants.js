import routes from './routes'
import { readResponse } from './helpers'

const getRestaurantOpeningHours = async restaurantId => {
  const resp = await fetch(routes.getRestaurantOpeningHours(restaurantId))
  const json = await readResponse(resp)
  return json
}

export default {
  getRestaurantOpeningHours
}
