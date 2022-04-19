import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Pagination = ({ exercisesPerPage, totalExercises, paginate }) => {
  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(totalExercises / exercisesPerPage); i++) {
    pageNumbers.push(i)
  }
  return (
    <div style={{ width: '10% !important' }}>
      <nav>
        <ul className='pagination'>
          {pageNumbers.map((number) => (
            <li key={number} className='page-item'>
              <Link to='/'>
                <p className='page-link' onClick={() => paginate(number)}>
                  {number}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default Pagination
