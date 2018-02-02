import { all, takeLatest, put, call, select } from 'redux-saga/effects'
import {
  getTasks,
  getTasksSuccess,
  getTasksFail,
  createTask,
  createTaskFail,
  createTaskSuccess,
  toggleTask,
  toggleTaskFail,
  toggleTaskSuccess,
  deleteTask,
  deleteTaskSuccess,
  deleteTaskFail
} from '../actions/tasks'

import { selectTaskById } from '../selectors/tasks'

import Api from '../services/api/tasks'

export function * handleGetTasks () {
  try {
    const openingHours = yield call(Api.getTasks)
    yield put(getTasksSuccess(openingHours))
  } catch (error) {
    yield put(getTasksFail())
  }
}

export function * handleCreateTask ({ payload: name }) {
  try {
    const taskData = {
      name
    }
    const task = yield call(Api.createTask, taskData)
    yield put(createTaskSuccess(task))
  } catch (error) {
    yield put(createTaskFail())
  }
}

export function * handleToggleTask ({ payload: _id }) {
  try {
    const task = yield select(selectTaskById, _id)
    const taskData = {
      completed: !task.completed
    }
    yield call(Api.updateTask, _id, taskData)
    yield put(toggleTaskSuccess({_id, completed: taskData.completed}))
  } catch (error) {
    yield put(toggleTaskFail())
  }
}

export function * handleDeleteTask ({ payload: _id }) {
  try {
    yield call(Api.deleteTask, _id)
    yield put(deleteTaskSuccess(_id))
  } catch (error) {
    yield put(deleteTaskFail())
  }
}

function * watchTasksActions () {
  yield all([
    takeLatest(getTasks, handleGetTasks),
    takeLatest(createTask, handleCreateTask),
    takeLatest(toggleTask, handleToggleTask),
    takeLatest(deleteTask, handleDeleteTask)
  ])
}

export default [
  watchTasksActions
]
