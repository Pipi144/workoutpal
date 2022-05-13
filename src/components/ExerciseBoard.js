import React from 'react'
import { Spinner } from 'react-bootstrap'
import './ExerciseBoard.css'
import { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import WorkoutForm from './WorkoutForm'

const ExerciseBoard = ({ exercises, loading }) => {
  const [show, setShow] = useState(false)
  const [addedExercise, setAddedExercise] = useState('')
  if (loading) {
    return <Spinner animation='border' variant='light' size='lg' />
  }

  const handleClose = () => {
    setShow(false)
    setAddedExercise('')
  }
  const handleShow = () => (event) => {
    setShow(true)

    //get id of chosen exercise
    const idOfChosenExercise = event.target.id
    //get an array of exercises matching id of chosen exercise, always return an array with length of 1
    const chosenExercise = exercises.filter(
      (exercise) => exercise.id === idOfChosenExercise
    )
    setAddedExercise(chosenExercise[0])
  }
  return (
    exercises && (
      <div className='exerciseBoardContainer'>
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
                <td>
                  <h5>{exercise.name}</h5>
                  <Button
                    variant='primary'
                    onClick={handleShow()}
                    id={exercise.id}
                  >
                    Add to workout
                  </Button>
                </td>
                <td>{exercise.target}</td>

                <td>{exercise.equipment}</td>
                <td>
                  <img src={exercise.gifUrl} style={{ maxWidth: '30%' }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Add Exercise</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <WorkoutForm exercise={addedExercise} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleClose}>
              Close
            </Button>
            <Button variant='primary' onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  )
}

export default ExerciseBoard
