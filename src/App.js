import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import UserRoute from './components/UserRoute'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getAuth } from 'firebase/auth'
import { setUser } from './redux/actions'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const auth = getAuth()
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(setUser(authUser))
      } else {
        dispatch(setUser(null))
      }
    })
  }, [dispatch])
  return (
    <BrowserRouter>
      <div className='App'>
        <Routes>
          <Route exact path='/' element={<UserRoute />}>
            <Route exact path='/home' element={<Home />} />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
