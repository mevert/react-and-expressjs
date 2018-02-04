const configService = require('../../src/services/config')
const dbService = require('../../src/services/db')
const httpService = require('../../src/services/http')
const tasksEndpoints = require('../../src/tasks/endpoints')

process.env.API_HTTP_PORT = 3001

const startAllservices = async () => {
  await configService.start()
  await dbService.start()
  await httpService.start()
  const router = httpService.getRouter()
  tasksEndpoints.defineRoutes(router)
  httpService.getApp().use('/api', router)
  httpService.getApp().use((err, req, res, next) => {
    console.log(err.stack)
    res.status(err.statusCode || 500).json({errorMessage: err.message})
  })
}

const stopAllServices = async () => {
  await httpService.stop()
  await dbService.stop()
}

const cleanDatabase = async () => {
  dbService.getDb().dropDatabase()
}

module.exports = {
  startAllservices,
  stopAllServices,
  cleanDatabase
}
