import { initializeApp } from '@firebase/app'
import 'firebase/auth'
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyDkyuix9XRgnZUjN84TyYCgTQ2pT3s3aK0',
  authDomain: 'workoutarr.firebaseapp.com',
  projectId: 'workoutarr',
  storageBucket: 'workoutarr.appspot.com',
  messagingSenderId: '5812215172',
  appId: '1:5812215172:web:1e42faeac9cd520ed351d1',
  measurementId: 'G-05QDD5HHW8',
}

const app = initializeApp(firebaseConfig)

const auth = getAuth(app)
const googleAuthProvider = new GoogleAuthProvider()
const facebookAuthProvider = new FacebookAuthProvider()

export { auth, googleAuthProvider, facebookAuthProvider }
