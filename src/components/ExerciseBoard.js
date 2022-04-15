import React, { useEffect } from 'react'
import { Spinner } from 'react-bootstrap'

const ExerciseBoard = ({ exercises, loading }) => {
  if (loading) {
    return <Spinner animation='border' variant='light' size='lg' />
  }

  return (
    exercises && (
      <div>
        <ul className='list-group mb-5'>
          {exercises.map((exercise) => (
            <li key={exercise.id} className='list-group-item'>
              {exercise.name}
            </li>
          ))}
        </ul>
      </div>
    )
  )
}

export default ExerciseBoard
