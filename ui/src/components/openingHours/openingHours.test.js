import React from 'react'
import { shallow } from 'enzyme'
import configureStore from 'redux-mock-store'
import OpeningHours from './openingHours'

const exampleState = {
  restaurant: {
    id: 'asdf',
    openingHours: [
      {
        day: 'monday',
        open: []
      },
      {
        day: 'tuesday',
        open: [
          '10:00 am - 6:00 pm'
        ]
      },
      {
        day: 'wednesday',
        open: []
      },
      {
        day: 'thursday',
        open: [
          '10:00 am - 6:00 pm',
          '7:00 pm - 8:00 pm'
        ]
      },
      {
        day: 'friday',
        open: []
      },
      {
        day: 'saturday',
        open: [
          '10:00 am - 8:00 pm'
        ]
      },
      {
        day: 'sunday',
        open: [
          '12:00 pm - 9:00 pm'
        ]
      }
    ]
  }
}

const shallowWithStore = (component, store) => {
  const context = { store }
  return shallow(component, { context })
}

describe('<OpeningHours />', () => {
  const mockStore = configureStore()

  it('should render component with opening hours', () => {
    const store = mockStore(exampleState)
    const component = shallowWithStore(<OpeningHours />, store)
    expect(component.dive().find('[data-test="monday-0"]').text()).toBe('Closed')
    expect(component.dive().find('[data-test="tuesday-0"]').text()).toBe('10:00 am - 6:00 pm')
    expect(component.dive().find('[data-test="wednesday-0"]').text()).toBe('Closed')
    expect(component.dive().find('[data-test="thursday-0"]').text()).toBe('10:00 am - 6:00 pm')
    expect(component.dive().find('[data-test="thursday-1"]').text()).toBe('7:00 pm - 8:00 pm')
    expect(component.dive().find('[data-test="friday-0"]').text()).toBe('Closed')
    expect(component.dive().find('[data-test="saturday-0"]').text()).toBe('10:00 am - 8:00 pm')
    expect(component.dive().find('[data-test="sunday-0"]').text()).toBe('12:00 pm - 9:00 pm')
  })

})
