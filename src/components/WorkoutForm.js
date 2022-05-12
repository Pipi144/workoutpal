import React from 'react'
import { useSelector } from 'react-redux'
import './WorkoutForm.css'
import { useState } from 'react'

const WorkoutForm = () => {
  const { workout } = useSelector((state) => state.workoutState)
  const workoutDays = Object.keys(workout)
  const [state, setState] = useState({
    checkControl: false,
    idControl: '',
    addedExercise: '',
  })
  const { exerciseSet, exerciseRep, checkControl, idControl } = state
  const handleChange = (e) => {
    let { name, value } = e.target
    setState({ ...state, [name]: value })
  }

  const handleCheck = (e) => {
    //get reference to the checkbox by ID to control input field (add sets, add reps)
    const idOfCheck = e.target.id
    setState({ ...state, idControl: idOfCheck, checkControl: !checkControl })
  }
  return (
    <div className='workoutFormContainer'>
      {workoutDays.map((day) => (
        <div key={day} className='form-check optionContainer'>
          <div className='checkContainer'>
            <input
              className='workoutDayCheck'
              type='checkbox'
              id={day}
              onChange={handleCheck}
            />
            <label className='form-check-label' for='flexCheckDefault'>
              {day}
            </label>
          </div>
          <div className='textContainer'>
            <input
              type='exerciseSet'
              className='form-control'
              id='exerciseSet'
              placeholder='Add Sets'
              onChange={handleChange}
              disabled={!(day === idControl && checkControl)}
            ></input>
          </div>
          <div className='textContainer'>
            <input
              type='exerciseRep'
              className='form-control'
              id='exerciseRep'
              placeholder='Add Reps'
              onChange={handleChange}
              disabled={!(day === idControl && checkControl)}
            ></input>
          </div>
        </div>
      ))}
    </div>
  )
}

export default WorkoutForm
