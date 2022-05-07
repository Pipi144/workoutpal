import * as types from './actionTypes'
import { auth, facebookAuthProvider, googleAuthProvider } from '../firebase'
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
} from 'firebase/auth'

import axios from 'axios'

/*register*/

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

/*log in */

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

/*log out */

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

/*google log in */

const googleSignInStart = () => ({
  type: types.GOOGLE_SIGN_IN_START,
})
const googleSignInSuccess = (user) => ({
  type: types.GOOGLE_SIGN_IN_SUCCESS,
  payload: user,
})
const googleSignInFail = (error) => ({
  type: types.GOOGLE_SIGN_IN_FAIL,
  payload: error,
})

/*facebook log in */

const facebookSignInStart = () => ({
  type: types.FACEBOOK_SIGN_IN_START,
})
const facebookSignInSuccess = (user) => ({
  type: types.FACEBOOK_SIGN_IN_SUCCESS,
  payload: user,
})
const facebookSignInFail = (error) => ({
  type: types.FACEBOOK_SIGN_IN_FAIL,
  payload: error,
})

/*get exertcise */

const getAllExcerciseStart = () => ({
  type: types.GET_EXERCISE_START,
})
const getAllExcerciseSuccess = (exercises) => ({
  type: types.GET_EXERCISE_SUCCESS,
  payload: exercises,
})
const getAllExcerciseFail = (error) => ({
  type: types.GET_EXERCISE_FAIL,
  payload: error,
})

const clearAllExcerciseStart = () => ({
  type: types.CLEAR_EXERCISE_START,
})
const clearAllExcerciseSuccess = () => ({
  type: types.CLEAR_EXERCISE_SUCCESS,
})
const clearAllExcerciseFail = (error) => ({
  type: types.CLEAR_EXERCISE_FAIL,
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
        alert(error)
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
        alert(error.message)
      })
  }
}

export const logoutInitial = () => {
  return function (dispatch) {
    dispatch(logoutStart())
    dispatch(clearAllExcerciseStart())
    const auth = getAuth()
    signOut(auth)
      .then((resp) => {
        dispatch(logoutSuccess())
        dispatch(clearAllExcerciseSuccess())
      })
      .catch((error) => {
        dispatch(logoutFail(error))
        dispatch(clearAllExcerciseFail())
        alert(error)
      })
  }
}

export const setUser = (user) => ({
  type: types.SET_USER,
  payload: user,
})

export const googleSignInInitial = () => {
  return function (dispatch) {
    dispatch(googleSignInStart())
    const auth = getAuth()
    signInWithPopup(auth, googleAuthProvider)
      .then(({ user }) => {
        dispatch(googleSignInSuccess(user))
      })
      .catch((error) => {
        dispatch(googleSignInFail(error))
        alert(error)
      })
  }
}

export const facebookSignInInitial = () => {
  return function (dispatch) {
    dispatch(facebookSignInStart())
    const auth = getAuth()
    signInWithPopup(auth, facebookAuthProvider.addScope('user_birthday, email'))
      .then(({ user }) => {
        dispatch(facebookSignInSuccess(user))
      })
      .catch((error) => {
        dispatch(facebookSignInFail(error))
        alert(error)
      })
  }
}

export const getAllExerciseInitial = () => {
  return function (dispatch) {
    dispatch(getAllExcerciseStart())
    const options = {
      method: 'GET',
      url: 'https://exercisedb.p.rapidapi.com/exercises',
      headers: {
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
        'X-RapidAPI-Key': 'fdc96c68admshfac222f18b64d47p1bb1c2jsn9e4c85c1eabe',
      },
    }

    axios
      .request(options)
      .then(function (response) {
        dispatch(getAllExcerciseSuccess(response.data))
      })
      .catch(function (error) {
        console.error(error)
        dispatch(getAllExcerciseFail(error))
      })
  }
}
