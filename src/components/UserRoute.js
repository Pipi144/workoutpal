import React from 'react'
import { useSelector } from 'react-redux'
import Home from '../pages/Home'
import LoadingToRedirect from './LoadingToRedirect'

const UserRoute = (props) => {
  const { currentUser } = useSelector((state) => state.user)
  return currentUser ? <props.component /> : <LoadingToRedirect />
}

export default UserRoute
