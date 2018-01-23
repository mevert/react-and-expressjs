import React from 'react'
import { Provider } from 'react-redux'
import OpeningHours from './components/openingHours'
import store from './configureStore'

const App = () => (
  <Provider store={store}>
    <OpeningHours />
  </Provider>
)

export default App
