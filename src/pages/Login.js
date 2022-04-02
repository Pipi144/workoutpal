import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { loginInitial } from '../redux/actions'
import './Login.css'

const Login = () => {
  const [state, setState] = useState({
    email: '',
    password: '',
  })
  const { email, password } = state
  const { currentUser } = useSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (currentUser) {
      console.log(currentUser)
      navigate('/')
    }
  }, [currentUser, navigate])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email || !password) {
      return
    }
    dispatch(loginInitial(email, password))
    setState({ email: '', password: '' })
  }
  const handleGoogleSignIn = () => {}
  const handleFBSignIn = () => {}
  const handleChange = (e) => {
    let { name, value } = e.target
    setState({ ...state, [name]: value })
  }
  return (
    <div>
      <div id='logreg-forms'>
        <form className='form-signin' onSubmit={handleSubmit}>
          <h1
            className='h3 mb-3 font-weight-normal'
            style={{ textAlign: 'center' }}
          >
            Sign in
          </h1>
          <div className='social-login'>
            <button
              className='btn google-btn social-btn'
              type='button'
              onClick={handleGoogleSignIn}
            >
              <span>
                <i className='fab fa-google-plus-g'></i> Sign in with Google
              </span>
            </button>
            <button
              className='btn facebook-btn social-btn'
              type='button'
              onClick={handleFBSignIn}
            >
              <span>
                <i className='fab fa-facebook-f'></i> Sign in with Facebook
              </span>
            </button>
          </div>
          <p style={{ textAlign: 'center' }}>Or</p>
          <input
            type='email'
            id='inputEmail'
            className='form-control'
            placeholder='Email Address'
            name='email'
            onChange={handleChange}
            value={email}
            required
          />
          <input
            type='password'
            id='inputPassword'
            className='form-control'
            placeholder='Password'
            name='password'
            onChange={handleChange}
            value={password}
            required
          />
          <button className='btn btn-secondary btn-lock' type='submit'>
            <i className='fas fa-sign-in-alt'></i> Sign in
          </button>
          <hr />
          <p>Dont have an account </p>
          <Link to='/register'>
            <button
              className='btn btn-primary btn-lock'
              type='button'
              id='btn-signup'
            >
              <i className='fas fa-user-plus'></i> Sign up new account
            </button>
          </Link>
        </form>
      </div>
    </div>
  )
}

export default Login
