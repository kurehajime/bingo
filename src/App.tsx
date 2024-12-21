import './App.css'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Create from './pages/Create'
import Join from './pages/Join'
import Top from './pages/Top'

function App() {

  return (
    <>
      <HashRouter>
        <Routes >
          <Route path="/create" element={
            <Create />
          } />
          <Route path="/join" element={
            <Join />
          } />
          <Route path="*" element={
            <Top />
          } />
        </Routes>
      </HashRouter>
    </>
  )
}

export default App
