import './App.css'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import UserRoute from './components/UserRoute'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getAuth } from 'firebase/auth'
import { setUser } from './redux/actions'
import Header from './components/Header'
import AddContact from './pages/AddContact'
import About from './pages/About'

function App() {
  const dispatch = useDispatch()
  const { currentUser } = useSelector((state) => state.user)
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
        {currentUser && <Header />}
        <Routes>
          <Route exact path='/' element={<UserRoute component={Home} />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route
            path='/addContact'
            element={<UserRoute component={AddContact} />}
          />
          <Route path='/about' element={<UserRoute component={About} />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
