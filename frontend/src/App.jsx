import { useState } from 'react'
import './App.css'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Register from './components/Register'
import About from './components/About'
import { Routes, Route, useLocation } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoutes'

function App() {
  const location = useLocation()
  const noNavbar = location.pathname === '/register' || location.pathname === '/'

  return (
    <>
      {
        noNavbar ?

        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
        </Routes>

        :

        <Navbar
          content={
            <Routes>
              <Route element={<ProtectedRoute/>}>
                <Route path="/home" element={<Home/>}/>
                <Route path="/about" element={<About/>}/>
              </Route>
            </Routes>
          }
        />
      }
    </>
  )
}

export default App
