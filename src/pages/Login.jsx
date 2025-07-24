import React, { useEffect } from "react";
import { motion } from "framer-motion";
import metroImage from "../assets/metro.jpg";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
        transition={{ duration: 0.8 }}
        className="w-full max-w-md p-8 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-lg shadow-[0_0_30px_rgba(0,0,0,0.3)]"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-white drop-shadow-md">
          Login to Your Account
        </h2>

        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 text-white placeholder-white/70 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 text-white placeholder-white/70 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-cyan-600 transition duration-300 shadow-md"
          >
            Login
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
