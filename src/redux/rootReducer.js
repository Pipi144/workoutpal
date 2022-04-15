import { combineReducers } from 'redux'
import userReducer from './reducer'
import exerciseReducer from './exerciseReducer'

const rootReducer = combineReducers({
  user: userReducer,
  exerciseState: exerciseReducer,
})

export default rootReducer
