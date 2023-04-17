import { useState } from 'react'
import './App.css'
import {BrowserRouter as Router, Routes, Route }from 'react-router-dom'
import Login from './assets/components/Login/Login'



function App() {

  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' element={<Login/>}/>

        </Routes>

      </Router>
    </div>
  )
}

export default App
