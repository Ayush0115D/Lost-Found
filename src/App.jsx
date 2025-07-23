import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Report from './pages/Report'
import VerifyClaim from './components/VerifyClaim'
import Login from './pages/Login'
import Register from './pages/Register'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/report" element={<Report />} />
       <Route path="/verify" element={<VerifyClaim />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/admin" element={<AdminPortal />} />
      </Routes>
     </Router>
  )
}

export default App
