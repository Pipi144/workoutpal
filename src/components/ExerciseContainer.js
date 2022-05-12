import React from 'react'
import './ExerciseContainer.css'

const ExerciseContainer = ({ exercise, rep, set }) => {
  console.log(exercise.name)
  return (
    <div className='exerciseItemContainer'>
      <div className='exercisePart'>{exercise.name}</div>

      <div className='exercisePart'>
        <img src={exercise.gifUrl} style={{ maxWidth: '30%' }} />
      </div>
      <div className='exercisePart'>{`${set} sets /${rep} reps`} </div>
    </div>
  )
}

export default ExerciseContainer
