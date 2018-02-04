import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table'
import IconButton from 'material-ui/IconButton'
import Checkbox from 'material-ui/Checkbox'
import DeleteIcon from 'material-ui-icons/Delete'
import Typography from 'material-ui/Typography'
import dateFormat from 'dateformat'

import {
  getTasks,
  createTask,
  toggleTask,
  deleteTask
} from '../../actions/tasks'
import { selectTasks, selectErrorMessage } from '../../selectors/tasks'

const containerStyle = {
  textAlign: 'center',
  margin: 15
}

const errorMsgStyle = {
  color: 'red'
}

class Tasks extends Component {
  static propTypes = {
    tasks: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      completed: PropTypes.bool
    })),
    errorMessage: PropTypes.string,
    getTasks: PropTypes.func.isRequired,
    createTask: PropTypes.func.isRequired,
    toggleTask: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired
  }

  state = {
    taskText: '',
    selectedTaskIds: []
  }

  componentWillMount = () => {
    this.props.getTasks()
  }

  handleTextFieldChange = e => {
    this.setState({ taskText: e.target.value })
  }

  handleTextFieldKeyDown = e => {
    if (e.key === 'Enter') {
      this.props.createTask(this.state.taskText)
      this.setState({ taskText: '' })
    }
  }

  handleRowClick = id => {
    this.props.toggleTask(id)
  }

  renderTaskRows = () => (
    this.props.tasks.map(
      task => {
        const isSelected = task.completed
        const cellStyle = isSelected ? { textDecoration: 'line-through' } : {}
        return (
          <TableRow
            key={task._id}
            hover
            tabIndex={-1}
            role='checkbox'
            aria-checked={isSelected}
            selected={isSelected}
          >
            <TableCell padding='checkbox'>
              <Checkbox
                onClick={() => this.handleRowClick(task._id)}
                checked={isSelected}
              />
            </TableCell>
            <TableCell data-test={`${task._id}-name`} style={cellStyle}>{task.name}</TableCell>
            <TableCell data-test={`${task._id}-date`} style={cellStyle}>{dateFormat(task.date)}</TableCell>
            <TableCell numeric>
              <IconButton
                onClick={() => this.props.deleteTask(task._id)}
                aria-label='Delete'
              >
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        )
      }
    )
  )

  render () {
    const { tasks, errorMessage } = this.props
    const { taskText } = this.state
    return (
      <div style={containerStyle}>
        <Typography type='display1' gutterBottom>
          Tasks
        </Typography>
        <TextField
          placeholder='What needs to be done? (press Enter to add new task)'
          margin='normal'
          fullWidth
          value={taskText}
          onKeyDown={this.handleTextFieldKeyDown}
          onChange={this.handleTextFieldChange}
        />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Completed</TableCell>
              <TableCell>Task</TableCell>
              <TableCell>Date </TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            { tasks.length > 0 && this.renderTaskRows() }
          </TableBody>
        </Table>
        { errorMessage && <p style={errorMsgStyle}>{errorMessage}</p> }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    tasks: selectTasks(state),
    errorMessage: selectErrorMessage(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getTasks: () => dispatch(getTasks()),
    createTask: taskText => dispatch(createTask(taskText)),
    toggleTask: id => dispatch(toggleTask(id)),
    deleteTask: id => dispatch(deleteTask(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tasks)
