const configService = require('./src/services/config')
const httpService = require('./src/services/http')
const restaurantsEndpoints = require('./src/restaurants/endpoints')

const start = async () => {
  // start all services
  await configService.start()
  await httpService.start()

  // define routes for router
  const router = httpService.getRouter()
  restaurantsEndpoints.defineRoutes(router)

  // use the defined router
  httpService.getApp().use('/api', router)

  // use error-handling middleware
  httpService.getApp().use((err, req, res, next) => {
    console.log(err.stack)
    res.status(err.statusCode || 500).json({errorMessage: err.message})
  })
}

start()
  .then(() => {
    console.log(`server started on port ${configService.get('http').port}`)
  })
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
