import * as types from './actionTypes'

const initialState = {
  workout: null,
  loading: false,
  error: null,
}

const workoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_EXERCISE_START:
      return {
        ...state,
        loading: true,
      }
    case types.ADD_EXERCISE_SUCCESS:
      return {
        ...state,
        workout: action.payload,
        loading: false,
      }
    case types.ADD_EXERCISE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    default:
      return state
  }
}

export default workoutReducer
