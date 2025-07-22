import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from "framer-motion";
import Home from './pages/Home'
import Report from './pages/Report'
import VerifyClaim from './components/VerifyClaim'
import Admin from './pages/Admin'
import Register from './pages/Register'
import Login from './pages/Login'
function App() {
  return (
    <AnimatePresence>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/report" element={<Report />} />
          <Route path="/verify" element={<VerifyClaim />} />
          <Route path="/admin" element={<Admin/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          
        </Routes>
      </Router>
    </AnimatePresence>
  );
}

export default App;