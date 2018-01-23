const convict = require('convict')

let config = null

const start = async () => {
  if (process.env.NODE_ENV === 'development') {
    require('dotenv').load()
  }
  config = convict({
    http: {
      port: {
        doc: 'Port for HTTP server',
        format: 'port',
        env: 'API_HTTP_PORT',
        default: 3001
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
