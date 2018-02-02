const expect = require('chai').expect
const ObjectID = require('mongodb').ObjectID
const testHelpers = require('../test-helpers')
const models = require('../../../src/tasks/models')

const exampleTask = {
  _id: ObjectID(),
  name: 'hi',
  date: new Date(),
  completed: false
}

describe('src.tasks.models', () => {
  beforeEach(async () => {
    await testHelpers.startAllservices()
    await testHelpers.cleanDatabase()
  })

  afterEach(async () => {
    await testHelpers.stopAllServices()
  })

  describe('createNewTask', () => {
    it('should add new task to database', async () => {
      const result = await models.createNewTask(exampleTask)
      expect(result).to.deep.equal(exampleTask)
    })
  })

  describe('updateTask', () => {
    it('should update task in database', async () => {
      await models.createNewTask(exampleTask)
      const updatedTask = {
        _id: exampleTask._id,
        name: 'yo',
        completed: true
      }
      const result = await models.updateTask(updatedTask)
      expect(result.modifiedCount).to.equal(1)
    })
  })

  describe('deleteTask', () => {
    it('should delete task from database', async () => {
      await models.createNewTask(exampleTask)
      const result = await models.deleteTask(exampleTask._id)
      expect(result.deletedCount).to.equal(1)
    })
  })

  describe('getTasks', () => {
    it('should get all tasks from database', async () => {
      const tasks = [
        exampleTask,
        {
          _id: ObjectID(),
          name: 'test',
          date: new Date(),
          completed: true
        }
      ]
      await models.createMultipleTasks(tasks)
      const result = await models.getTasks(exampleTask)
      expect(result).to.deep.equal(tasks)
    })
  })
})
