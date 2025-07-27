import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from './pages/Home';
import Report from './pages/Report';
import VerifyClaim from './components/VerifyClaim';
import Admin from './pages/Admin';
import Register from './pages/Register';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import LogoutButton from "./components/LogoutButton";

function App() {
  const token = localStorage.getItem("token");

  return (
    <AnimatePresence>
      <Router>
        {/* Show Logout button only if token exists */}
        {token && <LogoutButton />}

        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/report" element={<PrivateRoute><Report /></PrivateRoute>} />
          <Route path="/verify" element={<PrivateRoute><VerifyClaim /></PrivateRoute>} />
          <Route path="/admin" element={<PrivateRoute><Admin /></PrivateRoute>} />
        </Routes>
      </Router>
    </AnimatePresence>
  );
}

export default App;
