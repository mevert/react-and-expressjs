import React from 'react'
import { Provider } from 'react-redux'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import Tasks from './components/tasks'
import store from './configureStore'

const theme = createMuiTheme() // define custom theme

const App = () => (
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <Tasks />
    </MuiThemeProvider>
  </Provider>
)

export default App
