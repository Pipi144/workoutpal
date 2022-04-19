import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllExerciseInitial, logoutInitial } from '../redux/actions'
import { useNavigate } from 'react-router-dom'
import ExerciseBoard from '../components/ExerciseBoard'
import Pagination from '../components/Pagination'
import ReactPaginate from 'react-paginate'
import './Home.css'
const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  //user check
  const { currentUser } = useSelector((state) => state.user)

  //display exercise hooks
  const [currentPage, setCurrentPage] = useState(1)
  const [excercisesPerPage] = useState(5)

  const { exercises, loading } = useSelector((state) => state.exerciseState)

  const indexOfLastExcercise = currentPage * excercisesPerPage
  const indexOfFirstExcercise = indexOfLastExcercise + excercisesPerPage
  const pageCount = Math.ceil(exercises.length / excercisesPerPage)
  const [currentExcercises, setCurrentExercises] = useState(exercises)

  useEffect(() => {
    if (!exercises) {
      dispatch(getAllExerciseInitial())
    }
    if (exercises) {
      setCurrentExercises(
        exercises.slice(indexOfLastExcercise, indexOfFirstExcercise)
      )
    }
  }, [dispatch, exercises])

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

  //change page
  const changePage = ({ selected }) => {
    setCurrentPage(selected)
    setCurrentExercises(
      exercises.slice(indexOfLastExcercise, indexOfFirstExcercise)
    )
  }
  return (
    exercises && (
      <div className='homeContainer' style={{ width: '90%', paddingTop: '5%' }}>
        <ExerciseBoard exercises={currentExcercises} loading={loading} />
        <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={'paginationBttns'}
          previousLinkClassName={'previousBttn'}
          nextLinkClassName={'nextBttn'}
          disabledClassName={'paginationDisabled'}
          activeClassName={'paginationActive'}
        />
      </div>
    )
  )
}

export default Home
