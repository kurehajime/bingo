import './App.css'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Join from './pages/Join'
import Top from './pages/Top'
import Lottery from './pages/Lottery'
import Card from './pages/Card'

function App() {

  return (
    <>
      <HashRouter>
        <Routes >
          <Route path="/lottery" element={
            <Lottery />
          } />
          <Route path="/join/:roomId" element={
            <Join />
          } />
          <Route path="/:roomId/:userId" element={
            <Card />
          } />
          <Route path="/" element={
            <Top />
          } />
        </Routes>
      </HashRouter>
    </>
  )
}

export default App
