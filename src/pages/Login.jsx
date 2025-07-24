import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
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
    emailRef.current?.focus();
  }, []);

  const validate = () => {
    const newErrors = {};
    setServerError("");

    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format.";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required.";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      try {
        await new Promise((res) => setTimeout(res, 1000)); // Simulate API

        if (email !== "test@example.com" || password !== "password123") {
          setServerError("Invalid email or password.");
          return;
        }

        navigate("/dashboard");
      } catch {
        setServerError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleNavigateToRegister = () => {
    setTimeout(() => {
      navigate("/register");
    }, 500); // Delay to allow exit animation
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
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-lg shadow-[0_0_30px_rgba(0,0,0,0.3)]"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-white drop-shadow-md">
          Login to Your Account
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <input
              ref={emailRef}
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full h-12 px-4 text-white placeholder-white/70 bg-white/10 border ${
                errors.email ? "border-red-500" : "border-white/20"
              } rounded-lg focus:outline-none focus:ring-2 ${
                errors.email ? "focus:ring-red-500" : "focus:ring-blue-400"
              }`}
            />
            {errors.email && (
              <p className="text-red-400 text-sm">{errors.email}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full h-12 px-4 text-white placeholder-white/70 bg-white/10 border ${
                errors.password ? "border-red-500" : "border-white/20"
              } rounded-lg focus:outline-none focus:ring-2 ${
                errors.password ? "focus:ring-red-500" : "focus:ring-blue-400"
              }`}
            />
            {errors.password && (
              <p className="text-red-400 text-sm">{errors.password}</p>
            )}
          </div>

          {serverError && (
            <p className="text-red-400 text-sm text-center">{serverError}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full h-12 flex items-center justify-center bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-lg transition duration-300 shadow-md text-base ${
              loading
                ? "opacity-50 cursor-not-allowed"
                : "hover:from-blue-700 hover:to-cyan-600"
            }`}
          >
            {loading ? (
              <span className="animate-pulse">Logging in...</span>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-white/80">
          Don’t have an account?{" "}
          <button
            onClick={handleNavigateToRegister}
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
