import React, { useState } from "react";

function VerifyClaim() {
  const [form, setForm] = useState({
    reportId: "",
    mobile: "",
    otp: "",
    idProof: null,
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Verification and claim submitted successfully!");
    // Here you can integrate backend or Firestore logic
  };

  return (
    <div className="min-h-screen bg-black text-blue-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-xl bg-[#1e1e1e] p-8 rounded-2xl shadow-lg border border-gray-700">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Verification & Claim Process
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm mb-1">Enter Your FullName</label>
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
            <label className="block text-sm mb-1">Registered Mobile Number</label>
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
            <label className="block text-sm mb-1">OTP Verification</label>
            <input
              type="text"
              name="otp"
              value={form.otp}
              onChange={handleChange}
              required
              className="w-full p-2 bg-gray-800 border border-gray-600 rounded"
              placeholder="Enter received OTP"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Upload ID Proof (PDF or Image)</label>
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
              placeholder="Any extra information you'd like to share"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition"
          >
            Submit Claim
          </button>
        </form>
      </div>
    </div>
  );
}

export default VerifyClaim;
