import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllExerciseInitial, logoutInitial } from '../redux/actions'
import { useNavigate } from 'react-router-dom'
import ExerciseBoard from '../components/ExerciseBoard'
const Home = () => {
  const { currentUser } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleAuth = () => {
    if (currentUser) {
      dispatch(logoutInitial())
    }
  }
  useEffect(() => {
    if (!currentUser) {
      navigate('/login')
    }
  })
  return (
    <div>
      <h2>Welcome to our site</h2>
      <br />
      <button className='btn btn-danger' onClick={handleAuth}>
        Log out
      </button>
      <ExerciseBoard />
    </div>
  )
}

export default Home
