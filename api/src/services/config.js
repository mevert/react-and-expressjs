const convict = require('convict')

let config = null

const start = async () => {
  if (process.env.NODE_ENV === 'development') {
    require('dotenv').config()
  } else if (process.env.NODE_ENV === 'test') {
    require('dotenv').config({path: '.env.test'})
  }
  config = convict({
    http: {
      port: {
        doc: 'Port for HTTP server',
        format: 'port',
        env: 'API_HTTP_PORT',
        default: 3001
      }
    },
    db: {
      name: {
        doc: 'Database name',
        format: String,
        env: 'DB_NAME',
        default: 'testdb'
      },
      url: {
        doc: 'Database url',
        format: String,
        env: 'DB_URL',
        default: 'mongodb://localhost:27017'
      }
    }
  })
  config.validate({ allowed: 'strict' })
}

const get = key => (config.get(key))

module.exports = {
  get,
  start
}
