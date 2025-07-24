import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Report from './pages/Report'
import VerifyClaim from './components/VerifyClaim'
import AdminDashboard from './pages/AdminDashboard'
import Register from './pages/Register'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/report" element={<Report />} />
       <Route path="/verify" element={<VerifyClaim />} />    
   <Route path="/admin" element={<AdminDashboard />} />
           <Route path="/register" element={<Register />} />
      </Routes>
     </Router>
  )
}

export default App
