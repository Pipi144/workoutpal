import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { registerInitial } from '../redux/actions'
import './Register.css'

const Register = () => {
  const [state, setState] = useState({
    displayName: '',
    email: '',
    password: '',
    passwordConfirm: '',
  })
  const { currentUser } = useSelector((state) => state.user)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (currentUser) {
      navigate('/')
    }
  }, [currentUser, navigate])
  const { email, password, displayName, passwordConfirm } = state
  const handleSubmit = (e) => {
    e.preventDefault()
    if (password !== passwordConfirm) {
      return
    }
    dispatch(registerInitial(email, password, displayName))
    setState({ email: '', displayName: '', password: '', passwordConfirm: '' })
  }
  const handleChange = (e) => {
    let { name, value } = e.target
    setState({ ...state, [name]: value })
  }
  return (
    <div className='regForm-container'>
      <div id='register-form'>
        <form className='form-signin' onSubmit={handleSubmit}>
          <h1
            className='h3 mb-3 font-weight-normal'
            style={{ textAlign: 'center' }}
          >
            Sign up
          </h1>
          <input
            type='text'
            id='displayName'
            className='form-control'
            placeholder='Full name'
            name='displayName'
            onChange={handleChange}
            value={displayName}
            required
          />
          <input
            type='email'
            id='user-email'
            className='form-control'
            placeholder='Email Address'
            name='email'
            onChange={handleChange}
            value={email}
            required
          />
          <input
            type='password'
            id='userPassword'
            className='form-control'
            placeholder='Password'
            name='password'
            onChange={handleChange}
            value={password}
            required
          />
          <input
            type='password'
            id='inputPassword'
            className='form-control'
            placeholder='Repeat Password'
            name='passwordConfirm'
            onChange={handleChange}
            value={passwordConfirm}
            required
          />

          <button className='btn btn-primary btn-lock' type='submit'>
            <i className='fas fa-user-plus'></i> Sign up
          </button>
          <hr />
          <Link to='/login'>
            <i className='fas fa-angle-left'></i> Back
          </Link>
        </form>
        <br />
      </div>
    </div>
  )
}

export default Register
