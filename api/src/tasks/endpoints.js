const asyncMiddleware = require('express-async-wrap')
const status = require('http-status-codes')
const models = require('./models')

const ROOT_URL = '/tasks'

const postTask = asyncMiddleware(async (req, res) => {
  try {
    const task = await models.createNewTask(req.body)
    res.status(status.OK).json(task)
  } catch (err) {
    throw err
  }
})

const updateTask = asyncMiddleware(async (req, res) => {
  try {
    const { taskId } = req.params
    await models.updateTask(taskId, req.body)
    res.status(status.OK).end()
  } catch (err) {
    throw err
  }
})

const getTasks = asyncMiddleware(async (req, res) => {
  try {
    const tasks = await models.getTasks()
    res.status(status.OK).json(tasks)
  } catch (err) {
    throw err
  }
})

const deleteTask = asyncMiddleware(async (req, res) => {
  const { taskId } = req.params
  try {
    await models.deleteTask(taskId)
    res.status(status.OK).end()
  } catch (err) {
    throw err
  }
})

exports.defineRoutes = (router) => {
  router.post(ROOT_URL, postTask)
  router.get(ROOT_URL, getTasks)
  router.patch(`${ROOT_URL}/:taskId`, updateTask)
  router.delete(`${ROOT_URL}/:taskId`, deleteTask)
}
