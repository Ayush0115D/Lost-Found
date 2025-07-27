import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import metroImage from "../assets/metro.jpg";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (localStorage.getItem("token")) navigate("/");
  }, [navigate]);

  const validate = () => {
    const newErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = "Full name is required.";
    if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Invalid email.";
    if (!form.password || form.password.length < 6) newErrors.password = "Min 6 characters.";
    if (form.password !== form.confirmPassword) newErrors.confirmPassword = "Passwords do not match.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setServerError("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        fullName: form.fullName,
        email: form.email,
        password: form.password,
      });

      alert("Registration successful! Please log in.");
      navigate("/login");
    } catch (err) {
      setServerError(err.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
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
        className="w-full max-w-md p-8 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-lg"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-white">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {["fullName", "email", "password", "confirmPassword"].map((field) => (
            <div key={field}>
              <input
                type={field.includes("password") ? "password" : "text"}
                name={field}
                placeholder={
                  field === "confirmPassword"
                    ? "Confirm Password"
                    : field === "fullName"
                    ? "Full Name"
                    : field.charAt(0).toUpperCase() + field.slice(1)
                }
                value={form[field]}
                onChange={handleChange}
                className="w-full px-4 py-3 text-white bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors[field] && <p className="text-red-400 text-sm">{errors[field]}</p>}
            </div>
          ))}

          {serverError && (
            <p className="text-red-400 text-sm text-center">{serverError}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-cyan-600 disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-white/80">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-cyan-400 hover:underline"
          >
            Login
          </button>
        </p>
      </motion.div>
    </div>
  );
}

export default Register;
