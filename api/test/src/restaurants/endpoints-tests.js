const expect = require('chai').expect
const superagent = require('superagent')
const status = require('http-status-codes')
const uuid = require('uuid/v4')
const testHelpers = require('../../test-helpers')

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

describe('src.restaurants.endpoints', () => {
  const RESTAURANTS_API_URL = `http://localhost:${process.env.API_HTTP_PORT}/restaurants`

  beforeEach(async () => {
    await testHelpers.startAllservices()
  })

  afterEach(async () => {
    await testHelpers.stopAllServices()
  })

  describe('GET /restaurants/:restaurantId/hours', () => {
    const endpoint = `${RESTAURANTS_API_URL}/${uuid()}/hours`
    it('should return restaurant hours for restaurant', async () => {
      const resp = await superagent.get(endpoint)
      expect(resp.status).to.equal(status.OK)
      const openingHours = resp.body
      expect(openingHours).to.have.lengthOf(7)
      expect(openingHours).to.deep.equal(exampleOpeningHours)
    })
  })
})
