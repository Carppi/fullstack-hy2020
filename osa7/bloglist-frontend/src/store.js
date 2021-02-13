import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import notificationReducer from './reducers/notificationReducer'

const store = createStore(
  notificationReducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store