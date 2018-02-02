import routes from './routes'
import { readResponse } from './helpers'

const getTasks = async () => {
  const resp = await fetch(routes.getTasks())
  const json = await readResponse(resp)
  return json
}

const createTask = async taskData => {
  const resp = await fetch(routes.getTasks(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(taskData)
  })
  const json = await readResponse(resp)
  return json
}

const updateTask = async (taskId, taskData) => {
  const resp = await fetch(routes.getTask(taskId), {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(taskData)
  })
  const json = await readResponse(resp)
  return json
}

const deleteTask = async taskId => {
  const resp = await fetch(routes.getTask(taskId), {
    method: 'DELETE'
  })
  const json = await readResponse(resp)
  return json
}

export default {
  getTasks,
  createTask,
  updateTask,
  deleteTask
}
