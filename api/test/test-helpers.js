const configService = require('../src/services/config')
const httpService = require('../src/services/http')
const restaurantsEndpoints = require('../src/restaurants/endpoints')

process.env.API_HTTP_PORT = 3001

exports.startAllservices = async () => {
  await configService.start()
  await httpService.start()
  const router = httpService.getRouter()
  restaurantsEndpoints.defineRoutes(router)
  httpService.getApp().use('', router)
  httpService.getApp().use((err, req, res, next) => {
    console.log(err.stack)
    res.status(err.statusCode || 500).send(err.message)
  })
}

exports.stopAllServices = async () => {
  await httpService.stop()
}
