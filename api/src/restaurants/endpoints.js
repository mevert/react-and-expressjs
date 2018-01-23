const asyncMiddleware = require('express-async-wrap')
const status = require('http-status-codes')
const models = require('./models')

const ROOT_URL = '/restaurants'

const getRestaurantOpeningHours = asyncMiddleware(async (req, res) => {
  try {
    const openingHours = await models.getRestaurantOpeningHours()
    res.status(status.OK).json(openingHours)
  } catch (error) {
    console.error(error)
    throw new Error('Error in reading restaurant opening hours from file.')
  }
})

exports.defineRoutes = (router) => {
  router.get(`${ROOT_URL}/:restaurantId/hours`, getRestaurantOpeningHours)
}
