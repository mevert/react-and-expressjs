const expect = require('chai').expect
const models = require('../../../src/restaurants/models')
const restaurantSample = require('../data/restaurant-sample.json')
const restaurantSampleRandom = require('../data/restaurant-sample-random.json')

const exampleOpeningHours = [
  { day: 'monday', open: [] },
  { day: 'tuesday', open: [ '10:00 am - 6:00 pm' ] },
  { day: 'wednesday', open: [] },
  { day: 'thursday', open: [ '10:00 am - 6:00 pm' ] },
  { day: 'friday', open: [] },
  { day: 'saturday',
    open: [ '10:00 am - 8:00 pm' ] },
  { day: 'sunday', open: [ '12:00 pm - 9:00 pm' ] }
]

const exampleOpeningHoursRandom = [
  { day: 'monday', open: [] },
  { day: 'tuesday', open: [ '10:00 am - 6:00 pm' ] },
  { day: 'wednesday', open: [] },
  { day: 'thursday', open: [ '10:00 am - 6:00 pm' ] },
  { day: 'friday', open: [] },
  { day: 'saturday',
    open: [ '10:00 am - 4:00 pm', '8:00 pm - 11:00 pm' ]},
  { day: 'sunday', open: [ '12:00 pm - 9:00 pm' ] }
]

describe('src.restaurants.models', () => {
  describe('getRestaurantOpeningHours', () => {
    it('should return restaurant hours', async () => {
      const openingHours = await models.getRestaurantOpeningHours(restaurantSample)
      expect(openingHours).to.have.lengthOf(7)
      expect(openingHours).to.deep.equal(exampleOpeningHours)
    })
    it('should return restaurant hours when open hours are in random order', async () => {
      const openingHours = await models.getRestaurantOpeningHours(restaurantSampleRandom)
      expect(openingHours).to.have.lengthOf(7)
      expect(openingHours).to.deep.equal(exampleOpeningHoursRandom)
    })
  })
})
