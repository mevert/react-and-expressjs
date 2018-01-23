const { ascend, sort, prop } = require('ramda')
// this just an example data source. In real case, data could be fetched from database or some service.
const openingHoursData = require('../data/restaurant')
const {
  isOdd,
  isEven,
  getDateFromUnixTime,
  getDateString
} = require('../helpers')

const byTime = ascend(prop('value'))

const getRestaurantOpeningHours = (days = openingHoursData) => (
  // convert opening hours data to format that is easier to present in the UI
  Object.keys(days).map(day => {
    if (days[day].length) {
      // make sure that times are in correct order by sorting them first
      const open = sort(byTime, days[day])
        .map((time, i) => getDateString(isOdd(i), getDateFromUnixTime(time.value)))
        .reduce((acc, curr, i, arr) => {
          if (isEven(i)) {
            acc.push(arr.slice(i, i + 2).join(''))
          }
          return acc
        }, [])
      return { day, open }
    }
    return { day, open: [] }
  })
)

module.exports = {
  getRestaurantOpeningHours
}
