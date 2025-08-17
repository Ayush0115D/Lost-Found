import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function SuccessScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const reportId = location.state?.reportId || "UNKNOWN";

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#1e1e1e] text-white p-6">
      <div className="bg-[#2e2e2e] p-8 rounded shadow-lg max-w-lg text-center">
        <h2 className="text-3xl font-bold text-green-400 mb-4">✅ Report Submitted Successfully!</h2>
        <p className="text-lg text-gray-300 mb-2">Thank you for reporting.</p>
        <p className="text-xl font-semibold text-blue-300">Your Report ID:</p>
        <p className="text-2xl font-mono text-yellow-300 mb-4">{reportId}</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={handlePrint}
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white"
          >
            Print Acknowledgment
          </button>
          <button
            onClick={() => navigate("/")}
            className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded text-white"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default SuccessScreen;