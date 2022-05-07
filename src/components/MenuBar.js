import React from 'react'
import './MenuBar.css'
import { useState } from 'react'
import ExerciseBoard from './ExerciseBoard'
import Workout from './Workout'
import ReactPaginate from 'react-paginate'
const MenuBar = ({ exercises, loading, pageCount, changePage }) => {
  const [menuControl, setMenuControl] = useState(0)
  const renderComponent = () => {
    switch (menuControl) {
      case 0:
        return (
          <div className='homeContainer'>
            <ExerciseBoard exercises={exercises} loading={loading} />
            <div className='paginateContainer'>
              <ReactPaginate
                previousLabel={'Previous'}
                nextLabel={'Next'}
                breakLabel={'...'}
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
      case 1:
        return <Workout />
      default:
        return (
          <div className='exerciseBoardContainer'>
            <ExerciseBoard exercises={exercises} loading={loading} />
            <div className='paginateContainer'>
              <ReactPaginate
                previousLabel={'Previous'}
                nextLabel={'Next'}
                breakLabel={'...'}
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
    }
  }
  return (
    <div className='menuBarContainer'>
      <div className='btnContainer'>
        <button className='btnRow' onClick={() => setMenuControl(0)}>
          All Exercises
        </button>
        <button className='btnRow' onClick={() => setMenuControl(1)}>
          Your Workout
        </button>
        <button className='btnRow' onClick={() => setMenuControl(2)}>
          Nutrition
        </button>
      </div>
      {renderComponent()}
    </div>
  )
}

export default MenuBar
