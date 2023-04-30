import { BrowserRouter as Router,Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './components/Home'
import About from'./components/About'
import Contact from'./components/Contact'
import Portfolio from'./components/Portfolio'
import Dashboard  from './components/Dashboard'
import Register from './components/Register/Register'
import Profile from './components/Register/Profile'
import VerifyEmail from './components/Register/VerifyEmail';
import Login from './components/Register/Login'
import {useState, useEffect} from 'react'
import {AuthProvider} from './components/Register/AuthContext'
import {auth} from './firebase'
import {onAuthStateChanged} from 'firebase/auth'
import PrivateRoute from './components/Register/PrivateRoute'
import {Navigate} from 'react-router-dom'
import './App.scss'

function App() {

  const [currentUser, setCurrentUser] = useState(null)
  const [timeActive, setTimeActive] = useState(false)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
    })
  }, [])

  return (
    <>
     <Router>
      <AuthProvider value={{currentUser, timeActive, setTimeActive}}>
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route index element={<Home />}/>
        <Route path ="about" element={<About/>}/>
        <Route path ="contact" element={<Contact/>}/>
        <Route path ="portfolio" element={<Portfolio/>}/>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="register" element={<Register/>} />
          <Route exact path='/profile' element={
            <PrivateRoute>
              <Profile/>
            </PrivateRoute>
          }/>
          <Route path="/login" element={
            !currentUser?.emailVerified 
            ? <Login/>
            : <Navigate to='/profile' replace/>
          } />
          <Route path="/register" element={
            !currentUser?.emailVerified 
            ? <Register/>
            : <Navigate to='/' replace/>
          } />
          <Route path='/verify-email' element={<VerifyEmail/>} /> 
        </Route>
        
      </Routes>
      </AuthProvider>
  </Router>
    </>
  )
}

export default App
