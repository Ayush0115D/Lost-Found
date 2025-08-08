import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FeatureSection from "./FeatureSection"; // ✅ Import your feature card section

function VerifyClaim() {
  const [form, setForm] = useState({
    reportId: "",
    fullName: "",
    mobile: "",
    metroCardNo: "",
    idProof: null,
    notes: "",
  });

  const [unauthorized, setUnauthorized] = useState(false);
  const [status, setStatus] = useState(""); // "success" | "failure"
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUnauthorized(true);
      setTimeout(() => {
        navigate("/");
      }, 2500);
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("");

    try {
      const verifyRes = await axios.post("/api/verify-claim", {
        reportId: form.reportId,
        fullName: form.fullName,
        mobileNumber: form.mobile,
      });

      if (verifyRes.data?.match === true) {
        const formData = new FormData();
        formData.append("fullName", form.fullName);
        formData.append("mobileNumber", form.mobile);
        formData.append("metroCardOrQR", form.metroCardNo);
        formData.append("notes", form.notes);
        formData.append("idProof", form.idProof);

        await axios.post("/api/submit-verification", formData);
        setStatus("success");
      } else {
        setStatus("failure");
      }
    } catch (err) {
      console.error("Error in verification flow:", err.message);
      setStatus("failure");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (unauthorized) {
    return (
      <div className="min-h-screen bg-[#1e1e1e] text-white flex items-center justify-center">
        <div className="text-center p-8 bg-[#2a2a2a] rounded-xl border border-gray-700">
          <h2 className="text-2xl font-bold text-red-400 mb-4">Unauthorized</h2>
          <p>You are not authorized to access this page.</p>
          <p className="text-sm mt-2">Redirecting to homepage...</p>
        </div>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="text-center text-white bg-[#1e1e1e] p-10 rounded-2xl max-w-xl mx-auto mt-10">
        <h2 className="text-3xl font-bold mb-4 text-green-400">
          ✅ Report ID Matched Successfully
        </h2>
        <p className="mb-2">
          Your claim has been verified. Please wait for further communication from DMRC authorities.
        </p>
      </div>
    );
  }

  if (status === "failure") {
    return (
      <div className="text-center text-white bg-[#1e1e1e] p-10 rounded-2xl max-w-xl mx-auto mt-10">
        <h2 className="text-3xl font-bold mb-4 text-red-400">
          ❌ Verification Failed
        </h2>
        <p>No matching report found. Please check your entered details and try again.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-white py-10 px-4 space-y-12">
      <div className="bg-[#2a2a2a] rounded-2xl shadow-2xl p-8 max-w-3xl mx-auto">
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
              placeholder="Enter your report ID"
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
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Mobile Number</label>
            <input
              type="tel"
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              required
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white"
              placeholder="Enter mobile number"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">
              Metro Card / QR Code Number
            </label>
            <input
              type="text"
              name="metroCardNo"
              value={form.metroCardNo}
              onChange={handleChange}
              required
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white"
              placeholder="Enter metro card number or QR code"
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
            <label className="block text-sm mb-1">Additional Notes or Any Feedbacks</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows="4"
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white"
              placeholder="Any additional info"
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

      {/* ✅ Matching Feature Section */}
      <FeatureSection />
    </div>
  );
}

export default VerifyClaim;
