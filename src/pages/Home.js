import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllExerciseInitial, logoutInitial } from '../redux/actions'
import { useNavigate } from 'react-router-dom'
import './Home.css'
import MenuBar from '../components/MenuBar'

const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  //user check
  const { currentUser } = useSelector((state) => state.user)
  console.log(currentUser)

  //display exercise hooks
  const [currentPage, setCurrentPage] = useState(0)
  const excercisesPerPage = 5

  const { exercises, loading } = useSelector((state) => state.exerciseState)

  const [pageCount, setPageCount] = useState(0)
  const [currentExcercises, setCurrentExercises] = useState(exercises)

  useEffect(() => {
    if (!exercises) {
      dispatch(getAllExerciseInitial())
    }
  }, [])
  useEffect(() => {
    if (exercises) {
      const indexOfLastExcercise = currentPage * excercisesPerPage
      const indexOfFirstExcercise = indexOfLastExcercise + excercisesPerPage
      setCurrentExercises(
        exercises.slice(indexOfLastExcercise, indexOfFirstExcercise)
      )
      setPageCount(Math.ceil(exercises.length / excercisesPerPage))
    }
  }, [exercises])
  useEffect(() => {
    if (!currentUser) {
      navigate('/login')
    }
  })

  //change page
  const changePage = ({ selected }) => {
    const indexOfLastExcercise = selected * excercisesPerPage
    const indexOfFirstExcercise = indexOfLastExcercise + excercisesPerPage
    setCurrentExercises(
      exercises.slice(indexOfLastExcercise, indexOfFirstExcercise)
    )
  }
  return (
    exercises && (
      <div className='homeContainer'>
        <MenuBar
          exercises={currentExcercises}
          loading={loading}
          pageCount={pageCount}
          changePage={changePage}
        />
      </div>
    )
  )
}

export default Home
