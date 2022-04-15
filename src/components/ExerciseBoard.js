import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllExerciseInitial } from '../redux/actions'

function ExerciseBoard() {
  const dispatch = useDispatch()
  const { exercises } = useSelector((state) => state.exerciseState)

  useEffect(() => {
    dispatch(getAllExerciseInitial())
  }, [dispatch])
  const items = exercises
  return (
    <div>
      <ul></ul>
    </div>
  )
}

export default ExerciseBoard
