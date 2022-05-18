import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import './WorkoutForm.css'
import { useState } from 'react'

const WorkoutForm = () => {
  const { workout } = useSelector((state) => state.workoutState)
  const workoutDays = Object.keys(workout)
  const [inputFieldControl, setInputFieldControl] = useState({
    Monday: true,
    Tuesday: true,
    Wednesday: true,
    Thursday: true,
    Friday: true,
    Saturday: true,
    Sunday: true,
  })

  const [workoutDateAdded, setWorkoutDateAdded] = useState({
    Monday: { set: null, rep: null },
    Tuesday: { set: null, rep: null },
    Wednesday: { set: null, rep: null },
    Thursday: { set: null, rep: null },
    Friday: { set: null, rep: null },
    Saturday: { set: null, rep: null },
    Sunday: { set: null, rep: null },
  })
  const [inputField, setInputField] = useState('')
  const [valueInputField, setValueInputField] = useState('')
  const [currentId, setCurrentId] = useState('')

  const handleInputValue = (dayId) => {
    if (inputFieldControl[dayId] === true) {
      return ''
    }
  }

  //useEffect to avoid delay input value
  useEffect(() => {
    if (inputField && valueInputField && currentId) {
      if (inputField === 'set') {
        const updatedWorkoutAdded = workoutDateAdded
        Object.keys(updatedWorkoutAdded).forEach((key) => {
          if (key === currentId) {
            updatedWorkoutAdded[key].set = valueInputField
          }
        })
        setWorkoutDateAdded(updatedWorkoutAdded)
      }

      if (inputField === 'rep') {
        const updatedWorkoutAdded = workoutDateAdded
        Object.keys(updatedWorkoutAdded).forEach((key) => {
          if (key === currentId) {
            updatedWorkoutAdded[key].rep = valueInputField
          }
        })
        setWorkoutDateAdded(updatedWorkoutAdded)
      }
    }
  }, [valueInputField, inputField, currentId])

  const handleChange = (e) => {
    const { name, value } = e.target
    setCurrentId(e.target.id)
    setInputField(name)
    setValueInputField(value)
  }
  const handleCheck = (e) => {
    //get reference to the checkbox by ID to control input field (add sets, add reps)
    const idOfCheck = e.target.id
    const checkStatus = e.target.checked

    //control input field
    setInputFieldControl({ ...inputFieldControl, [idOfCheck]: !checkStatus })

    //update workoutAdded object
    if (checkStatus === true) {
      if (workoutDateAdded.hasOwnProperty(idOfCheck) === false) {
        setWorkoutDateAdded({ ...workoutDateAdded, [idOfCheck]: {} })
      }
    } else {
      const updatedWorkoutAdded = workoutDateAdded
      delete updatedWorkoutAdded[`${idOfCheck}`]
      setWorkoutDateAdded(updatedWorkoutAdded)
    }
  }

  return {
    setWorkoutDateAdded,
    inputFieldControl,
    setInputFieldControl,
    workoutDateAdded,
    renderWorkoutForm: (
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
              <label className='form-check-label' htmlFor='flexCheckDefault'>
                {day}
              </label>
            </div>
            <div className='textContainer'>
              <input
                type='text'
                pattern='[0-9]*'
                className='form'
                id={day}
                placeholder='Add Sets'
                name='set'
                onChange={handleChange}
                disabled={inputFieldControl[day]}
                value={handleInputValue(day)}
                required
              ></input>
            </div>
            <div className='textContainer'>
              <input
                type='text'
                pattern='[0-9]*'
                className='form'
                id={day}
                placeholder='Add Reps'
                name='rep'
                onChange={handleChange}
                disabled={inputFieldControl[day]}
                value={handleInputValue(day)}
                required
              ></input>
            </div>
          </div>
        ))}
      </div>
    ),
  }
}

export default WorkoutForm
