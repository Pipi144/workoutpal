import React from 'react'
import { useSelector } from 'react-redux'
import './WorkoutForm.css'
import { useState } from 'react'

const WorkoutForm = ({ exercise }) => {
  const { workout } = useSelector((state) => state.workoutState)
  const workoutDays = Object.keys(workout)
  const [state, setState] = useState({
    checkControl: false,
    idControl: [],
    addedExercise: {},
  })
  console.log(state)
  const { checkControl, idControl } = state
  const handleChange = (e) => {
    let { name, value } = e.target
    setState({ ...state.addedExercise, [name]: value })
  }

  const handleCheck = (e) => {
    //get reference to the checkbox by ID to control input field (add sets, add reps)
    const idOfCheck = e.target.id

    //if checkbox is checked => set checkcontrol to enable input (Set and rep), and get the chosen day
    if (e.target.checked) {
      setState({
        ...state,
        idControl: [...idControl, idOfCheck],
        checkControl: e.target.checked,
      })
    }
    //if unchecked, disable input for rep and set and remove chosen date
    else {
      setState({
        ...state,
        checkControl: false,
        idControl: idControl.filter((value) => value !== idOfCheck),
      })
    }
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
              value={checkControl}
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
              name='set'
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
              name='rep'
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
