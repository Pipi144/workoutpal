import { db } from '../firebase'
import { collection, addDoc, setDoc, getDocs, doc } from 'firebase/firestore'

export default class ExerciseAdded {
  constructor(addedWorkoutDays, exercise, userId) {
    this.addedWorkoutDays = addedWorkoutDays
    this.exercise = exercise
    this.userId = userId
    console.log(this.userId)
  }

  update() {}

  async saveToDatabase() {
    if (this.exercise && this.addedWorkoutDays) {
    }
  }
}
