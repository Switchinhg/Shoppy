import { useState } from 'react'
import './App.css'
import {BrowserRouter as Router, Routes, Route }from 'react-router-dom'
import Login from './assets/components/Login/Login'
import LinkUnico from './assets/components/Login/LinkUnico'
// import LinkUnico from './assets/components/Login/LinkUnico'



function App() {

  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' element={<Login/>}/>
          {/* <Route path='/success/:jwt' element={<LinkUnico/>}/> */}
          <Route path='/link' element={<LinkUnico/>}/>

        </Routes>

      </Router>
    </div>
  )
}

export default App
