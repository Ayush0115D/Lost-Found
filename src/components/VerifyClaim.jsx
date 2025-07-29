import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
      // STEP 1: Verify the claim
      const verifyRes = await axios.post("/api/verify-claim", {
        reportId: form.reportId,
        fullName: form.fullName,
        mobileNumber: form.mobile,
      });

      if (verifyRes.data?.match === true) {
        // STEP 2: Submit the rest of the claim details
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
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center p-8 bg-[#1e1e1e] rounded-xl border border-gray-700">
          <h2 className="text-2xl font-bold text-red-400 mb-4">Unauthorized</h2>
          <p>You are not authorized to access this page.</p>
          <p className="text-sm mt-2">Redirecting to homepage...</p>
        </div>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="bg-[#1e1e1e] p-8 rounded-2xl shadow-lg border border-gray-700 text-center max-w-lg">
          <h2 className="text-3xl font-bold text-green-400 mb-4">✅ Report ID Matched Successfully</h2>
          <p className="mb-2">Your claim has been verified. Please wait for further communication from DMRC authorities.</p>
        </div>
      </div>
    );
  }

  if (status === "failure") {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="bg-[#1e1e1e] p-8 rounded-2xl shadow-lg border border-gray-700 text-center max-w-lg">
          <h2 className="text-3xl font-bold text-red-400 mb-4">❌ Verification Failed</h2>
          <p>No matching report found. Please check your entered details and try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-blue-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-xl bg-[#1e1e1e] p-8 rounded-2xl shadow-lg border border-gray-700">
        <h2 className="text-3xl font-bold mb-6 text-center">Verification & Claim Process</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm mb-1">Enter Report ID</label>
            <input
              type="text"
              name="reportId"
              value={form.reportId}
              onChange={handleChange}
              required
              className="w-full p-2 bg-gray-800 border border-gray-600 rounded"
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
              className="w-full p-2 bg-gray-800 border border-gray-600 rounded"
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
              className="w-full p-2 bg-gray-800 border border-gray-600 rounded"
              placeholder="Enter mobile number"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Metro Card / QR Code</label>
            <input
              type="text"
              name="metroCardNo"
              value={form.metroCardNo}
              onChange={handleChange}
              required
              className="w-full p-2 bg-gray-800 border border-gray-600 rounded"
              placeholder="Enter metro card number or QR code"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Upload Item Proof/Report Proof</label>
            <input
              type="file"
              name="idProof"
              accept=".pdf, image/*"
              onChange={handleChange}
              required
              className="w-full text-sm bg-gray-800 border border-gray-600 rounded p-2"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Additional Notes</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows="4"
              className="w-full p-2 bg-gray-800 border border-gray-600 rounded"
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
    </div>
  );
}

export default VerifyClaim;
