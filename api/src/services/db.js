const MongoClient = require('mongodb').MongoClient
const configService = require('./config')

let db = null
let client = null

const start = async () => {
  const config = configService.get('db')
  try {
    client = await MongoClient.connect(config.url)
  } catch (error) {
    throw error
  }
  db = client.db(config.name)
}

const stop = async () => {
  await client.close()
}

const getDb = () => {
  return db
}

const getDbCollection = (collectionName) => {
  return db.collection(collectionName)
}

module.exports = {
  start,
  stop,
  getDb,
  getDbCollection
}
