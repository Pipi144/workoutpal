import * as types from './actionTypes'
import { auth } from '../firebase'
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
const registerStart = () => ({
  type: types.REGISTER_START,
})
const registerSuccess = (user) => ({
  type: types.REGISTER_SUCCESS,
  payload: user,
})
const registerFail = (error) => ({
  type: types.REGISTER_FAIL,
  payload: error,
})

export const registerInitial = (email, password, displayName) => {
  return function (dispatch) {
    dispatch(registerStart())
    const auth = getAuth()
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        updateProfile(user, { displayName })
        dispatch(registerSuccess(user))
      })
      .catch((error) => {
        dispatch(registerFail(error))
      })
  }
}
