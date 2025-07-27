import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from './pages/Home';
import Report from './pages/Report';
import VerifyClaim from './components/VerifyClaim';
import Admin from './pages/Admin';
import Register from './pages/Register';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import LogoutButton from "./components/LogoutButton";
import { useEffect, useState } from "react";
import SuccessScreen from "./components/SuccessScreen";
// Wrapper component to handle logout button visibility
function AppWrapper() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location.pathname]);

  const hideOnPaths = ["/login", "/register", "/admin"];

  return (
    <>
      {!hideOnPaths.includes(location.pathname) && isLoggedIn && <LogoutButton />}
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/report" element={<PrivateRoute><Report /></PrivateRoute>} />
        <Route path="/verify" element={<PrivateRoute><VerifyClaim /></PrivateRoute>} />
        <Route path="/admin" element={<PrivateRoute><Admin /></PrivateRoute>} />
        <Route path="/success" element={<PrivateRoute><SuccessScreen /></PrivateRoute>} />

      </Routes>
    </>
  );
}

function App() {
  return (
    <AnimatePresence>
      <Router>
        <AppWrapper />
      </Router>
    </AnimatePresence>
  );
}

export default App;
