import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TodoHome from './components/TodoHome'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <TodoHome></TodoHome>
    </>
  )
}

export default App
