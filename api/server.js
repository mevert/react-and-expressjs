const bodyParser = require('body-parser')
const configService = require('./src/services/config')
const dbService = require('./src/services/db')
const httpService = require('./src/services/http')
const tasksEndpoints = require('./src/tasks/endpoints')

const start = async () => {
  // start all services
  await configService.start()
  await dbService.start()
  await httpService.start()

  // define routes for router
  const router = httpService.getRouter()
  tasksEndpoints.defineRoutes(router)

  // use the defined router
  httpService.getApp().use(bodyParser.json())
  httpService.getApp().use('/api', router)

  // use error-handling middleware
  httpService.getApp().use((err, req, res, next) => {
    console.log(err.stack)
    res.status(err.statusCode || 500).json({errorMessage: err.message})
  })
}

const runServer = async () => {
  try {
    await start()
    console.log(`server started on port ${configService.get('http').port}`)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

runServer()
