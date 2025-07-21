import React from "react";
import { ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

function VerificationCard() {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-lg mt-10 max-w-xl mx-auto">
      <div className="flex items-center gap-4 mb-4">
        <ShieldCheck className="text-blue-400 w-8 h-8" />
        <h2 className="text-2xl font-semibold">Verification & Claim</h2>
      </div>
      <p className="text-gray-300 mb-4">
        Verify your identity and claim your reported item securely.
      </p>
      <button
        onClick={() => navigate("/verify")}
        className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
      >
        Start Verification
      </button>
    </div>
  );
}

export default VerificationCard;
