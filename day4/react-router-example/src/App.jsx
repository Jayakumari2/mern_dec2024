import { Link, Route,Routes } from 'react-router-dom'
import { useState } from 'react'
import './App.css'
import Home from './components/Home'
import Contact from './components/Contact'
import AboutUs from './components/AboutUs'

function App() {
  return (
    <>
     <h1>Hello world</h1>
     <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/about' element={<AboutUs/>}/>
     </Routes>

     <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About us page</Link>
        </li>
        <li>
          <Link to="/contact">contact us</Link>
        </li>
      </ul>
     </nav>
    </>
  )
}

export default App
