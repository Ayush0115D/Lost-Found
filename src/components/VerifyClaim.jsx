import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FeatureSection from "./FeatureSection";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function VerifyClaim() {
  const [form, setForm] = useState({
    reportId: "",
    fullName: "",
    contactNumber: "",
    metroCardOrQR: "",
    idProof: null,
    notes: "",
  });

  const [unauthorized, setUnauthorized] = useState(false);
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUnauthorized(true);
      setTimeout(() => navigate("/"), 2500);
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value.trimStart(),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("");

    try {
      const formData = new FormData();
      formData.append("reportId", form.reportId.trim());
      formData.append("fullName", form.fullName.trim());
      formData.append("contactNumber", form.contactNumber.trim());
      formData.append("metroCardOrQR", form.metroCardOrQR.trim());
      formData.append("notes", form.notes.trim());
      formData.append("idProof", form.idProof);

      const res = await axios.post(`${API_BASE_URL}/api/verify`, formData, {
        withCredentials: true,
      });

      if (res.data?.success) {
        setStatus("success");
        setTimeout(() => navigate("/"), 9000); // Redirect to homepage after 9s
      } else {
        setStatus("failure");
      }
    } catch (err) {
      console.error(
        "Error in verification flow:",
        err.response?.data || err.message
      );
      setStatus("failure");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (unauthorized) {
    return (
      <div className="min-h-screen bg-[#1e1e1e] text-white flex items-center justify-center">
        <div className="text-center p-8 bg-[#2a2a2a] rounded-xl border border-gray-700 animate-fadeIn">
          <h2 className="text-2xl font-bold text-red-400 mb-4">Unauthorized</h2>
          <p>You are not authorized to access this page.</p>
          <p className="text-sm mt-2">Redirecting to homepage...</p>
        </div>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-900 to-gray-900 text-white">
        <div className="bg-[#0f2f1c] p-10 rounded-3xl shadow-2xl text-center max-w-lg w-full animate-fadeIn border border-green-600">
          <div className="text-green-400 text-7xl mb-4 animate-bounce">✅</div>
          <h2 className="text-3xl font-extrabold mb-4 text-green-300">
            Verification Successful!
          </h2>
          <p className="text-lg mb-6 text-gray-200">
            Your details matched with the reported item.
            <br />
            Redirecting to homepage in <span className="font-bold">9 seconds</span>...
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition shadow-md"
          >
            Go to Homepage Now
          </button>
        </div>
      </div>
    );
  }

  if (status === "failure") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1e1e1e] text-white">
        <div className="bg-[#2a2a2a] p-10 rounded-3xl shadow-2xl text-center max-w-lg w-full animate-fadeIn border border-red-600">
          <div className="text-red-400 text-7xl mb-4">❌</div>
          <h2 className="text-3xl font-bold mb-4">Verification Failed</h2>
          <p className="text-lg mb-6">
            No matching report found. Please check your entered details.
          </p>
          <button
            onClick={() => setStatus("")}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition shadow-md"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-white py-10 px-4 space-y-12">
      <div className="bg-[#2a2a2a] rounded-2xl shadow-2xl p-8 max-w-3xl mx-auto animate-fadeIn">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Verification & Claim Process
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm mb-1">Enter Report ID</label>
            <input
              type="text"
              name="reportId"
              value={form.reportId}
              onChange={handleChange}
              required
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              required
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Mobile Number</label>
            <input
              type="tel"
              name="contactNumber"
              value={form.contactNumber}
              onChange={handleChange}
              required
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">
              Metro Card / QR Code Number
            </label>
            <input
              type="text"
              name="metroCardOrQR"
              value={form.metroCardOrQR}
              onChange={handleChange}
              required
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">
              Upload Item Proof / ID Proof
            </label>
            <input
              type="file"
              name="idProof"
              accept=".pdf, image/*"
              onChange={handleChange}
              required
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Additional Notes</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows="4"
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition"
          >
            {isSubmitting ? "Verifying..." : "Submit Claim"}
          </button>
        </form>
      </div>

      <FeatureSection />
    </div>
  );
}

export default VerifyClaim;