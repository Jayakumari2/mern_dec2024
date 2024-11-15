import { Link, Route,Routes } from 'react-router-dom'
import { useState } from 'react'
import './App.css'
import Home from './components/Home'
import Contact from './components/Contactus'
import AboutUs from './components/Aboutus'

function App() {
  return (
    <>
     
     <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/about' element={<AboutUs/>}/>
     </Routes>

    </>
  )
}

export default App
