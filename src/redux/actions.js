import * as types from './actionTypes'
import { auth } from '../firebase'
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
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

const loginStart = () => ({
  type: types.LOGIN_START,
})
const loginSuccess = (user) => ({
  type: types.LOGIN_SUCCESS,
  payload: user,
})
const loginFail = (error) => ({
  type: types.LOGIN_FAIL,
  payload: error,
})

const logoutStart = () => ({
  type: types.LOGOUT_START,
})
const logoutSuccess = () => ({
  type: types.LOGOUT_SUCCESS,
})
const logoutFail = (error) => ({
  type: types.LOGOUT_FAIL,
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

export const loginInitial = (email, password) => {
  return function (dispatch) {
    dispatch(loginStart())
    const auth = getAuth()
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(loginSuccess(user))
      })
      .catch((error) => {
        dispatch(loginFail(error))
      })
  }
}

export const logoutInitial = () => {
  return function (dispatch) {
    dispatch(logoutStart())
    const auth = getAuth()
    signOut(auth)
      .then((resp) => {
        dispatch(logoutSuccess())
      })
      .catch((error) => {
        dispatch(logoutFail(error))
      })
  }
}
