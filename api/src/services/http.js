const express = require('express')
const bodyParser = require('body-parser')
const configService = require('./config')

let app = null
let httpServer = null
let router = express.Router()

const start = async () => {
  const config = configService.get('http')
  app = express()
  app.use(bodyParser.json())
  return new Promise((resolve, reject) => {
    httpServer = app.listen(config.port, () => {
      resolve()
    })
  })
}

const stop = async () => {
  if (httpServer && httpServer.listening) {
    await new Promise((resolve, reject) => {
      httpServer.close(err => {
        if (err) reject(err)
        else resolve()
      })
    })
  }
  app = null
  httpServer = null
}

const getRouter = () => (router)

const getApp = () => (app)

module.exports = {
  start,
  stop,
  getRouter,
  getApp
}
