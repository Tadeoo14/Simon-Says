import { useState, useEffect } from 'react'
import Game from './components/Game.jsx'
import './css/Game.css'

function App() {
  const [setence, setSetence] = useState(0)
  const [play, setPlay] = useState(false) 

  return (
    <Game/>
  )
}

export default App
