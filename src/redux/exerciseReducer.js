import * as types from './actionTypes'

const initialState = {
  exercises: null,
  loading: false,
  error: null,
}

const exerciseReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_EXERCISE_START:
      return {
        ...state,
        loading: true,
      }
    case types.GET_EXERCISE_SUCCESS:
      return {
        ...state,
        exercises: action.payload,
        loading: false,
      }
    case types.GET_EXERCISE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case types.CLEAR_EXERCISE_START:
      return {
        ...state,
        loading: true,
      }
    case types.CLEAR_EXERCISE_SUCCESS:
      return {
        ...state,
        exercises: null,
        loading: false,
      }
    case types.CLEAR_EXERCISE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    default:
      return state
  }
}

export default exerciseReducer
