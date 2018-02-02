import { handleActions } from 'redux-actions'
import {
  getTasksSuccess,
  getTasksFail,
  createTaskSuccess,
  toggleTaskSuccess,
  deleteTaskSuccess
} from '../actions/tasks'

const initialState = {
  tasks: []
}

const restaurant = handleActions({
  [getTasksSuccess]: {
    next (state, { payload: tasks }) {
      return {
        ...state,
        tasks
      }
    }
  },
  [getTasksFail]: {
    next (state, { payload }) {
      return {
        ...state,
        errorMessage: payload
      }
    }
  },
  [createTaskSuccess]: {
    next (state, { payload: task }) {
      return {
        ...state,
        tasks: [
          ...state.tasks,
          task
        ]
      }
    }
  },
  [toggleTaskSuccess]: {
    next (state, { payload: taskData }) {
      return {
        ...state,
        tasks: state.tasks.map(task => (taskData._id === task._id ? { ...task, ...taskData } : task))
      }
    }
  },
  [deleteTaskSuccess]: {
    next (state, { payload: _id }) {
      return {
        ...state,
        tasks: state.tasks.filter(task => (_id !== task._id ? task : undefined))
      }
    }
  }
}, initialState)

export default restaurant
