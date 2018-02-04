import { createAction } from 'redux-actions'

const createTask = createAction('TASKS__CREATE_TASK')
const createTaskSuccess = createAction('TASKS__CREATE_TASK_SUCCESS')
const createTaskFail = createAction('TASKS__CREATE_TASK_FAIL')

const deleteTask = createAction('TASKS__DELETE_TASK')
const deleteTaskSuccess = createAction('TASKS__DELETE_TASK_SUCCESS')
const deleteTaskFail = createAction('TASKS__DELETE_TASK_FAIL')

const toggleTask = createAction('TASKS__TOGGLE_TASK')
const toggleTaskSuccess = createAction('TASKS__TOGGLE_TASK_SUCCESS')
const toggleTaskFail = createAction('TASKS__TOGGLE_TASK_FAIL')

const getTasks = createAction('TASKS__GET_TASKS')
const getTasksSuccess = createAction('TASKS__GET_TASKS_SUCCESS')
const getTasksFail = createAction('TASKS__GET_TASKS_FAIL')

export {
  createTask,
  createTaskSuccess,
  createTaskFail,
  deleteTask,
  deleteTaskSuccess,
  deleteTaskFail,
  toggleTask,
  toggleTaskSuccess,
  toggleTaskFail,
  getTasks,
  getTasksSuccess,
  getTasksFail
}
