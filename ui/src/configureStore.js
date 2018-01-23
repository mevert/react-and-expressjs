import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { fork } from 'redux-saga/effects'

import rootReducer from './reducers'
import sagas from './sagas'

function * sagaRunner (sagas) {
  for (let saga of sagas) {
    yield fork(saga)
  }
}

const sagaMiddleware = createSagaMiddleware()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const middleware = [
  sagaMiddleware
]

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware))
)

sagaMiddleware.run(sagaRunner, sagas)

export default store
