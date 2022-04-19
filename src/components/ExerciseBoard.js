import React from 'react'
import { Spinner } from 'react-bootstrap'

const ExerciseBoard = ({ exercises, loading }) => {
  if (loading) {
    return <Spinner animation='border' variant='light' size='lg' />
  }
  return (
    exercises && (
      <div>
        <table
          className='table table-bordered'
          style={{ backgroundColor: 'white' }}
        >
          <thead>
            <tr>
              <th scope='col'>Name</th>
              <th scope='col'>Body Part</th>

              <th scope='col'>Equipment</th>
              <th scope='col'>Target</th>
            </tr>
          </thead>
          <tbody>
            {exercises.map((exercise) => (
              <tr key={exercise.id}>
                <td>{exercise.name}</td>
                <td>{exercise.bodyPart}</td>

                <td>{exercise.equipment}</td>
                <td>
                  <img src={exercise.gifUrl} style={{ maxWidth: '30%' }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  )
}

export default ExerciseBoard
