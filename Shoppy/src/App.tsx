import { useState } from 'react'
import './App.css'
import {BrowserRouter as Router, Routes, Route }from 'react-router-dom'
import Login from './assets/components/Login/Login'
import Success from './assets/components/Login/Success'



function App() {

  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/success/:jwt' element={<Success/>}/>

        </Routes>

      </Router>
    </div>
  )
}

export default App
