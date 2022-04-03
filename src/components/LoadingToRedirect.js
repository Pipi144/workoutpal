import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'

const LoadingToRedirect = () => {
  const [count, setCount] = useState(3)
  const navigate = useNavigate()

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount)
    }, 1000)
    count === 0 && navigate('/login')
    return () => clearInterval(interval)
  }, [count, navigate])
  return (
    <div>
      <Spinner animation='border' variant='light' size='lg' />
      <p style={{ color: 'white', fontSize: '2rem' }}>
        Redirecting you in {count} seconds
      </p>
    </div>
  )
}

export default LoadingToRedirect
