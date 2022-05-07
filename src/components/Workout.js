import React from 'react'
import './Workout.css'
import { Dropdown } from 'react-bootstrap'

const Workout = () => {
  return (
    <div className='workoutContainer'>
      <div className='workoutItem'>
        <Dropdown>
          <Dropdown.Toggle
            variant='success'
            id='dropdown-basic'
            className='dropdownBtn'
          >
            Dropdown Button
          </Dropdown.Toggle>

          <Dropdown.Menu className='workoutMenuItem'>
            <Dropdown.Item href='#/action-1'>Action</Dropdown.Item>
            <Dropdown.Item href='#/action-2'>Another action</Dropdown.Item>
            <Dropdown.Item href='#/action-3'>Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <div className='workoutItem'>
        <Dropdown>
          <Dropdown.Toggle
            variant='success'
            id='dropdown-basic'
            className='dropdownBtn'
          >
            Dropdown Button
          </Dropdown.Toggle>

          <Dropdown.Menu className='workoutMenuItem'>
            <Dropdown.Item href='#/action-1'>Action</Dropdown.Item>
            <Dropdown.Item href='#/action-2'>Another action</Dropdown.Item>
            <Dropdown.Item href='#/action-3'>Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  )
}

export default Workout
