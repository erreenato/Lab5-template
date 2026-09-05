import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Threads from './pages/Threads'
import Thread from './pages/Thread'

function App() {
  // P4: React Router mantiene la aplicación como SPA, pero permite que la URL
  // represente la vista actual y que funcionen atrás/adelante y bookmarks.
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Threads />} />
        <Route path="/threads/:id" element={<Thread />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
