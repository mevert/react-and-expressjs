const { getDbCollection } = require('../services/db')
const ObjectID = require('mongodb').ObjectID

const collectionName = 'tasks'

const createNewTask = async ({_id, name, date, completed}) => {
  const collection = getDbCollection(collectionName)
  const result = await collection.insertOne({
    _id,
    name,
    date: date || new Date(),
    completed: completed || false
  })
  return result.ops[0]
}

const createMultipleTasks = async (tasks) => {
  const collection = getDbCollection(collectionName)
  const result = await collection.insertMany(tasks)
  return result
}

const updateTask = async (_id, {name, completed}) => {
  const collection = getDbCollection(collectionName)
  await collection.updateOne(
    { _id: ObjectID(_id) },
    {
      $set: {
        completed // TODO add also name and remove undefined values
      }
    }
  )
}

const deleteTask = async (_id) => {
  const collection = getDbCollection(collectionName)
  await collection.deleteOne({_id: ObjectID(_id)})
}

const getTasks = async () => {
  const collection = getDbCollection(collectionName)
  const result = await collection.find()
  const tasks = await result.toArray()
  return tasks
}

module.exports = {
  createNewTask,
  createMultipleTasks,
  updateTask,
  deleteTask,
  getTasks
}
