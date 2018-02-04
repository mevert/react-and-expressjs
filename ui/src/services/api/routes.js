import config from '../../config'

const { tasksApi } = config

const getTasks = () =>
  `${tasksApi}/tasks`

const getTask = taskId =>
  `${tasksApi}/tasks/${taskId}`

export default {
  getTasks,
  getTask
}
