import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Report from './pages/Report'
import VerifyClaim from './components/VerifyClaim'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/report" element={<Report />} />
       <Route path="/verify" element={<VerifyClaim />} />
      </Routes>
     </Router>
  )
}

export default App
