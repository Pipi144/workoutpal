import React from 'react'
import { useSelector } from 'react-redux'
import Home from '../pages/Home'
import LoadingToRedirect from './LoadingToRedirect'

const UserRoute = () => {
  const { currentUser } = useSelector((state) => state.user)
  return currentUser ? <Home /> : <LoadingToRedirect />
}

export default UserRoute
