import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllExerciseInitial, logoutInitial } from '../redux/actions'
import { useNavigate } from 'react-router-dom'
import ExerciseBoard from '../components/ExerciseBoard'
import Pagination from '../components/Pagination'
import ReactPaginate from 'react-paginate'
import './Home.css'
import MenuBar from '../components/MenuBar'
const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  //user check
  const { currentUser } = useSelector((state) => state.user)

  //display exercise hooks
  const [currentPage, setCurrentPage] = useState(0)
  const excercisesPerPage = 5

  const { exercises, loading } = useSelector((state) => state.exerciseState)

  const indexOfLastExcercise = currentPage * excercisesPerPage
  const indexOfFirstExcercise = indexOfLastExcercise + excercisesPerPage
  const [pageCount, setPageCount] = useState(0)
  const [currentExcercises, setCurrentExercises] = useState(exercises)

  useEffect(() => {
    if (!exercises) {
      dispatch(getAllExerciseInitial())
    }
    if (exercises) {
      setCurrentExercises(
        exercises.slice(indexOfLastExcercise, indexOfFirstExcercise)
      )
      setPageCount(Math.ceil(exercises.length / excercisesPerPage))
    }
  }, [dispatch, exercises, setCurrentExercises, setPageCount])

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
    console.log(currentExcercises)
  }
  return (
    exercises && (
      <div
        className='homeContainer'
        style={{ maxWidth: '80%', paddingTop: '5%' }}
      >
        <MenuBar />
        <ExerciseBoard exercises={currentExcercises} loading={loading} />
        <div className='paginateContainer'>
          <ReactPaginate
            previousLabel={'Previous'}
            nextLabel={'Next'}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={'pagination'}
            previousLinkClassName={'page-link'}
            nextLinkClassName={'page-link'}
            disabledClassName={'disabled'}
            activeClassName={'active'}
            pageClassName={'page-item'}
            pageLinkClassName={'page-link'}
            breakClassName={'page-item'}
            breakLinkClassName={'page-link'}
          />
        </div>
      </div>
    )
  )
}

export default Home
