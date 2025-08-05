import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import metroImage from "../assets/metro.jpg";

function Login() {
  const navigate = useNavigate();
  const emailRef = useRef(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    if (localStorage.getItem("token")) navigate("/");
    emailRef.current?.focus();
  }, [navigate]);

  const validate = () => {
    const newErrors = {};
    if (!email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email.";
    if (!password.trim()) newErrors.password = "Password is required.";
    else if (password.length < 6) newErrors.password = "Min 6 characters.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setServerError("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("userEmail", res.data.user.email); //  For admin access check
      navigate("/");
    } catch (err) {
      setServerError(err.response?.data?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${metroImage})`,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        backgroundBlendMode: "overlay",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-lg shadow-[0_0_30px_rgba(0,0,0,0.3)]"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-white drop-shadow-md">
          Login to Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              ref={emailRef}
              type="email"
              placeholder="Email"
              className={`w-full px-4 py-3 text-white placeholder-white/70 bg-white/10 border ${
                errors.email ? "border-red-500" : "border-white/20"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              className={`w-full px-4 py-3 text-white placeholder-white/70 bg-white/10 border ${
                errors.password ? "border-red-500" : "border-white/20"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {serverError && (
            <p className="text-red-400 text-sm text-center">{serverError}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-cyan-600 transition duration-300 shadow-md disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-white/80">
          Don’t have an account?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-cyan-400 hover:underline transition"
          >
            Register
          </button>
        </p>
      </motion.div>
    </div>
  );
}

export default Login;