import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { getOpeningHours } from '../../actions/restaurant'
import { getOpeningHours as getHours, getErrorMessage } from '../../selectors/restaurant'

const containerStyle = {
  textAlign: 'center',
  margin: 15
}

const dayStyle = {
  textTransform: 'capitalize',
  fontWeight: 'bold'
}

const errorMsgStyle = {
  color: 'red'
}

class OpeningHours extends Component {
  static propTypes = {
    openingHours: PropTypes.arrayOf(PropTypes.shape({
      day: PropTypes.string,
      open: PropTypes.array
    })),
    errorMessage: PropTypes.string,
    getOpeningHours: PropTypes.func.isRequired
  }

  componentWillMount = () => {
    this.props.getOpeningHours()
  }

  renderTimes = (day, times) => {
    return times.map(
      (t, i) => (
        <p data-test={`${day}-${i}`} key={`${day}-${i}`}>{t}</p>
      )
    )
  }

  renderOpeningHours = () => (
    this.props.openingHours.map(
      d => (
        <Fragment key={d.day}>
          <div style={dayStyle}>{d.day}</div>
          { d.open.length ? this.renderTimes(d.day, d.open) : <p data-test={`${d.day}-0`} >Closed</p> }
        </Fragment>
      )
    )
  )

  render () {
    const { openingHours, errorMessage } = this.props
    return (
      <div style={containerStyle}>
        <h3>Restaurant opening hours</h3>
        { openingHours.length > 0 && this.renderOpeningHours() }
        { errorMessage && <p style={errorMsgStyle}>{errorMessage}</p> }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  openingHours: getHours(state),
  errorMessage: getErrorMessage(state)
})

const mapDispatchToProps = dispatch => {
  return {
    getOpeningHours: () => dispatch(getOpeningHours())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OpeningHours)
