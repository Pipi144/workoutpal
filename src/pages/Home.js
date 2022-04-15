import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllExerciseInitial, logoutInitial } from '../redux/actions'
import { useNavigate } from 'react-router-dom'
import ExerciseBoard from '../components/ExerciseBoard'
import Pagination from '../components/Pagination'
const Home = () => {
  const { currentUser } = useSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [pageCount, setPageCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [excercisesPerPage, setexcercisesPerPage] = useState(12)

  const { exercises, loading } = useSelector((state) => state.exerciseState)
  useEffect(() => {
    dispatch(getAllExerciseInitial())
  }, [dispatch])

  const indexOfLastExcercise = currentPage * excercisesPerPage
  const indexOfFirstExcercise = indexOfLastExcercise - excercisesPerPage
  const currentExcercises = exercises.slice(
    indexOfFirstExcercise,
    indexOfLastExcercise
  )

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
    <div style={{ width: '90%' }}>
      <ExerciseBoard exercises={currentExcercises} loading={loading} />
    </div>
  )
}

export default Home
