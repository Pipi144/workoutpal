import React, { useEffect } from 'react'
import { Spinner } from 'react-bootstrap'
import './ExerciseBoard.css'
import { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import WorkoutForm from './WorkoutForm'
import ExerciseAdded from '../Classes/ExerciseAdded'

const ExerciseBoard = ({ exercises, loading }) => {
  const {
    setWorkoutDateAdded,
    workoutDateAdded,
    renderWorkoutForm,
    inputFieldControl,
    setInputFieldControl,
  } = WorkoutForm()
  const [show, setShow] = useState(false)
  const [addedExercise, setAddedExercise] = useState('')
  const [exerciseDays, setExerciseDays] = useState('')

  useEffect(() => {}, [workoutDateAdded, addedExercise])
  if (loading) {
    return <Spinner animation='border' variant='light' size='lg' />
  }
  //handle close modal
  const handleClose = () => {
    setShow(false)
    setAddedExercise('')
    setExerciseDays('')

    //RESET workout added
    setWorkoutDateAdded({
      Monday: { set: null, rep: null },
      Tuesday: { set: null, rep: null },
      Wednesday: { set: null, rep: null },
      Thursday: { set: null, rep: null },
      Friday: { set: null, rep: null },
      Saturday: { set: null, rep: null },
      Sunday: { set: null, rep: null },
    })

    //reset add exercise form
    setInputFieldControl({
      Monday: true,
      Tuesday: true,
      Wednesday: true,
      Thursday: true,
      Friday: true,
      Saturday: true,
      Sunday: true,
    })
  }

  //handle show modal
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

  /*handle save workout*/
  const handleSave = () => {
    const addedWorkoutDateDetails = {} //to save final added workout details

    let emptyInputCheck = false //to alert for empty input

    //check every inputs in form to check empty
    Object.keys(inputFieldControl).every((key) => {
      if (inputFieldControl[key] === false) {
        if (
          workoutDateAdded[key]['set'] === null ||
          workoutDateAdded[key]['rep'] === null
        ) {
          emptyInputCheck = true
          return false
        }
      }
      return true
    })

    //if have empty field => alert user
    if (emptyInputCheck === true) {
      alert('Please fill input for set and rep')
    }
    //no empty input =>get final object of added workout details
    else {
      Object.keys(workoutDateAdded).forEach((key) => {
        if (inputFieldControl[key] === false) {
          if (
            workoutDateAdded[key]['set'] !== null &&
            workoutDateAdded[key]['rep'] !== null
          ) {
            addedWorkoutDateDetails[key] = {
              set: workoutDateAdded[key]['set'],
              rep: workoutDateAdded[key]['rep'],
            }
          }
        }
      })
      const finalAddedExerciseDetails = new ExerciseAdded(
        addedWorkoutDateDetails,
        addedExercise
      )
      finalAddedExerciseDetails.saveToDatabase()
      setAddedExercise('')
      setExerciseDays('')

      //RESET workout added
      setWorkoutDateAdded({
        Monday: { set: null, rep: null },
        Tuesday: { set: null, rep: null },
        Wednesday: { set: null, rep: null },
        Thursday: { set: null, rep: null },
        Friday: { set: null, rep: null },
        Saturday: { set: null, rep: null },
        Sunday: { set: null, rep: null },
      })

      //reset add exercise form
      setInputFieldControl({
        Monday: true,
        Tuesday: true,
        Wednesday: true,
        Thursday: true,
        Friday: true,
        Saturday: true,
        Sunday: true,
      })
      setShow(false)
    }
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
          <Modal.Body>{renderWorkoutForm}</Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleClose}>
              Close
            </Button>
            <Button variant='primary' onClick={handleSave}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  )
}

export default ExerciseBoard
