import { combineReducers } from 'redux'
import userReducer from './reducer'
import exerciseReducer from './exerciseReducer'
import workoutReducer from './workoutReducer'

const rootReducer = combineReducers({
  user: userReducer,
  exerciseState: exerciseReducer,
  workoutState: workoutReducer,
})

export default rootReducer
