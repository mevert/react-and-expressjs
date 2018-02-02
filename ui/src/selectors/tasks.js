
const selectTasks = state => state.tasks.tasks
const selectErrorMessage = state => state.tasks.errorMessage
const selectTaskById = (state, id) => selectTasks(state).filter(task => task._id === id)[0]

export {
  selectTasks,
  selectErrorMessage,
  selectTaskById
}
