const dateFormat = require('dateformat')

const isOdd = (n) => (n % 2 !== 0)

const isEven = (n) => (n % 2 === 0)

const getDateFromUnixTime = (unixTime) => (new Date(unixTime * 1000))

const getDateString = (isOpening, date) => (`${isOpening ? ' - ' : ''}${dateFormat(date, 'UTC:h:MM tt')}`)

module.exports = {
  isOdd,
  isEven,
  getDateFromUnixTime,
  getDateString
}
