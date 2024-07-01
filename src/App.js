import React from 'react'
import './App.css'
import AppRoutes from './AppRoutes'
import Navbar from './components/Navbar'
import axios from 'axios'
const App = () => {

  // axios.defaults.baseURL = 'http://localhost:3001/api/'
  axios.defaults.baseURL = 'https://assgn-server.onrender.com/api/'

  return (
    <>
      <Navbar />
      <AppRoutes />
    </>
  )
}

export default App
