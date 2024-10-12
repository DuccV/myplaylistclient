import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import { HomePage } from './components/HomePage'
import { NewPlaylist } from './components/NewPlaylist'
import { Playing } from "./components/Playing";
import { AddSongs } from './components/AddSongs'

function App() {

  return (
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/new-playlist' element={<NewPlaylist/>}/>
      <Route path='/playing' element={<Playing/>}/>
      <Route path='/add' element={<AddSongs/>}/>
    </Routes>
  )
}

export default App
