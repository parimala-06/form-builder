import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components/ui/button'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
<h1 className="text-3xl font-bold underline text-blue-700">
      Hello world!
    </h1>
    <Button>Click me</Button>
    </>
  )
}

export default App