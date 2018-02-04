const expect = require('chai').expect
const ObjectID = require('mongodb').ObjectID
const superagent = require('superagent')
const status = require('http-status-codes')
const testHelpers = require('../test-helpers')
const models = require('../../../src/tasks/models')

describe('src.tasks.endpoints', function () {
  let task1, task2

  const API_TASKS_URL = `http://localhost:${process.env
    .API_HTTP_PORT}/api/tasks`

  const createTestData = async () => {
    task1 = await models.createNewTask({
      _id: ObjectID(),
      name: 'hi',
      date: new Date(),
      completed: false
    })
    task2 = await models.createNewTask({
      _id: ObjectID(),
      name: 'yo',
      date: new Date(),
      completed: false
    })
  }

  beforeEach(async () => {
    await testHelpers.startAllservices()
    await testHelpers.cleanDatabase()
    await createTestData()
  })

  afterEach(async () => {
    await testHelpers.stopAllServices()
  })

  describe('GET /tasks', () => {
    it('should return tasks', async () => {
      const resp = await superagent.get(API_TASKS_URL)
      expect(resp.status).to.equal(status.OK)
      const tasks = resp.body
      expect(tasks).to.have.lengthOf(2)
      expect(JSON.stringify(tasks)).to.equal(JSON.stringify([task1, task2]))
    })
  })

  describe('POST /tasks', () => {
    it('should post new task', async () => {
      const resp = await superagent.post(API_TASKS_URL).send({ name: 'sample task' })
      expect(resp.status).to.equal(status.CREATED)
      const { name } = resp.body
      expect(name).to.equal('sample task')
    })
  })

  describe('DELETE /tasks/:taskId', () => {
    it('should delete task', async () => {
      const taskId = task1._id
      const resp = await superagent.delete(`${API_TASKS_URL}/${taskId}`)
      expect(resp.status).to.equal(status.OK)
    })
  })

  describe('PATCH /tasks/:taskId', () => {
    it('should patch task', async () => {
      const taskId = task1._id
      const resp = await superagent.patch(`${API_TASKS_URL}/${taskId}`).send({ completed: true })
      expect(resp.status).to.equal(status.OK)
      const task = await models.getTask(taskId)
      expect(task._id).to.deep.equal(taskId)
    })
  })
})
