import React from 'react'
import { shallow } from 'enzyme'
import configureStore from 'redux-mock-store'
import Tasks from './tasks'

const exampleState = {
  tasks: {
    tasks: [
      {
        _id: 'testid',
        name: 'example task name',
        date: new Date('2017-12-17T03:24:00'),
        completed: false
      },
      {
        _id: 'testid2',
        name: 'example task name 2',
        date: new Date('2017-12-20T03:24:00'),
        completed: true
      }
    ]
  }
}

const shallowWithStore = (component, store) => {
  const context = { store }
  return shallow(component, { context })
}

describe('<Tasks />', () => {
  const mockStore = configureStore()

  it('should render component with some tasks', () => {
    const store = mockStore(exampleState)
    const component = shallowWithStore(<Tasks />, store)
    expect(component.dive().find('[data-test="testid-name"]').dive().dive().text()).toBe('example task name')
    expect(component.dive().find('[data-test="testid-date"]').dive().dive().text()).toBe('Sun Dec 17 2017 03:24:00')
    expect(component.dive().find('[data-test="testid2-name"]').dive().dive().text()).toBe('example task name 2')
    expect(component.dive().find('[data-test="testid2-date"]').dive().dive().text()).toBe('Wed Dec 20 2017 03:24:00')
  })
})
