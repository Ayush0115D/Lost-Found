// ===== UPDATED Login.jsx =====
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import metroImage from "../assets/metro.jpg";

function Login() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("user");

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userErrors, setUserErrors] = useState({});
  const [userLoading, setUserLoading] = useState(false);
  const [userServerError, setUserServerError] = useState("");

  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [adminErrors, setAdminErrors] = useState({});
  const [adminLoading, setAdminLoading] = useState(false);
  const [adminServerError, setAdminServerError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    if (localStorage.getItem("token")) navigate("/");
  }, [navigate]);

  const validate = (email, password, setErrors) => {
    const newErrors = {};
    if (!email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email.";
    if (!password.trim()) newErrors.password = "Password is required.";
    else if (password.length < 6) newErrors.password = "Min 6 characters.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // User Login Handler
  const handleUserSubmit = async (e) => {
    e.preventDefault();
    if (!validate(userEmail, userPassword, setUserErrors)) return;
    setUserLoading(true);
    setUserServerError("");

    try {
      const res = await axios.post(`/api/auth/login`, {
        email: userEmail,
        password: userPassword,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("userEmail", res.data.user.email);
      localStorage.setItem("userRole", res.data.role);

      navigate("/");
    } catch (err) {
      setUserServerError(err.response?.data?.message || "Login failed.");
    } finally {
      setUserLoading(false);
    }
  };

  // Admin Login Handler
  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    if (!validate(adminEmail, adminPassword, setAdminErrors)) return;
    setAdminLoading(true);
    setAdminServerError("");

    try {
      const res = await axios.post(`/api/auth/admin-login`, {
        email: adminEmail,
        password: adminPassword,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("userEmail", res.data.user.email);
      localStorage.setItem("userRole", res.data.role);

      navigate("/admin");
    } catch (err) {
      setAdminServerError(err.response?.data?.message || "Admin login failed.");
    } finally {
      setAdminLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${metroImage})`,
        backgroundColor: "rgba(0, 0, 0, 0.65)",
        backgroundBlendMode: "overlay",
      }}
    >
      <div className="max-w-md w-full bg-black/40 backdrop-blur-md rounded-2xl p-6 shadow-lg">
        {/* Sliding Tabs */}
        <div className="relative flex justify-center mb-6 bg-gray-800 rounded-full p-1">
          <button
            type="button"
            onClick={() => setActiveTab("user")}
            className={`relative z-10 flex-1 py-2 text-center rounded-full font-semibold transition-colors ${
              activeTab === "user" ? "text-white" : "text-gray-400"
            }`}
          >
            User Login
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("admin")}
            className={`relative z-10 flex-1 py-2 text-center rounded-full font-semibold transition-colors ${
              activeTab === "admin" ? "text-white" : "text-gray-400"
            }`}
          >
            Admin Login
          </button>

          {/* Sliding highlight */}
          <span
            className={`absolute top-1 left-1 bottom-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full transition-all duration-300 ease-in-out ${
              activeTab === "user" ? "w-1/2 left-1" : "w-1/2 left-1/2"
            }`}
            style={{ willChange: "left, width" }}
          />
        </div>

        {/* User Login Form */}
        {activeTab === "user" && (
          <form
            onSubmit={handleUserSubmit}
            autoComplete="on"
            className="flex flex-col gap-4"
            id="user-login-form"
          >
            <input
              type="email"
              name="user-email"
              autoComplete="username"
              placeholder="Email"
              className={`w-full px-5 py-3 rounded-md text-white placeholder-gray-300 border ${
                userErrors.email ? "border-red-500" : "border-gray-400"
              } focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent`}
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
            {userErrors.email && (
              <p className="text-red-400 text-sm">{userErrors.email}</p>
            )}

            <input
              type="password"
              name="user-password"
              autoComplete="current-password"
              placeholder="Password"
              className={`w-full px-5 py-3 rounded-md text-white placeholder-gray-300 border ${
                userErrors.password ? "border-red-500" : "border-gray-400"
              } focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent`}
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
            />
            {userErrors.password && (
              <p className="text-red-400 text-sm">{userErrors.password}</p>
            )}

            {userServerError && (
              <p className="text-red-400 text-center">{userServerError}</p>
            )}

            <button
              type="submit"
              disabled={userLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-md py-3 hover:from-blue-700 hover:to-cyan-600 transition disabled:opacity-60"
            >
              {userLoading ? "Logging in..." : "Login"}
            </button>

            <p className="text-center text-white/80 text-sm mt-4">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/register")}
                className="text-cyan-400 hover:underline"
              >
                Register
              </button>
            </p>
          </form>
        )}

        {/* Admin Login Form */}
        {activeTab === "admin" && (
          <form
            onSubmit={handleAdminSubmit}
            autoComplete="off"
            className="flex flex-col gap-4"
            id="admin-login-form"
          >
            <input
              type="text"
              name="fakeusernameremembered"
              style={{ display: "none" }}
              autoComplete="username"
            />
            <input
              type="password"
              name="fakepasswordremembered"
              style={{ display: "none" }}
              autoComplete="current-password"
            />

            <input
              type="email"
              name="admin-email"
              autoComplete="off"
              placeholder="Admin Email"
              className={`w-full px-5 py-3 rounded-md text-white placeholder-gray-300 border ${
                adminErrors.email ? "border-red-500" : "border-gray-400"
              } focus:outline-none focus:ring-2 focus:ring-red-500 bg-transparent`}
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
            />
            {adminErrors.email && (
              <p className="text-red-400 text-sm">{adminErrors.email}</p>
            )}

            <input
              type="password"
              name="admin-password"
              autoComplete="new-password"
              placeholder="Password"
              className={`w-full px-5 py-3 rounded-md text-white placeholder-gray-300 border ${
                adminErrors.password ? "border-red-500" : "border-gray-400"
              } focus:outline-none focus:ring-2 focus:ring-red-500 bg-transparent`}
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
            />
            {adminErrors.password && (
              <p className="text-red-400 text-sm">{adminErrors.password}</p>
            )}

            {adminServerError && (
              <p className="text-red-400 text-center">{adminServerError}</p>
            )}

            <button
              type="submit"
              disabled={adminLoading}
              className="w-full bg-gradient-to-r from-red-600 to-pink-500 text-white font-semibold rounded-md py-3 hover:from-red-700 hover:to-pink-600 transition disabled:opacity-60"
            >
              {adminLoading ? "Logging in..." : "Admin Login"}
            </button>

            <p className="text-center text-white/80 text-sm mt-4">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/register")}
                className="text-pink-400 hover:underline"
              >
                Register
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

export default Login;
