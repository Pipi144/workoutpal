import React from 'react'
import './Workout.css'
import { Dropdown } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import ExerciseContainer from './ExerciseContainer'
const Workout = () => {
  const { exercises, loading } = useSelector((state) => state.exerciseState)
  return (
    <div className='workoutContainer'>
      <div className='workoutItem'>
        <Dropdown>
          <Dropdown.Toggle
            variant='success'
            id='dropdown-basic'
            className='dropdownBtn'
          >
            Monday
          </Dropdown.Toggle>

          <Dropdown.Menu className='workoutMenuItem'>
            <Dropdown.Item style={{ backgroundColor: 'white' }}>
              <ExerciseContainer exercise={exercises[0]} rep={15} set={3} />
              <ExerciseContainer exercise={exercises[0]} rep={15} set={3} />
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  )
}

export default Workout
