// src/components/LostItemCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const LostItemCard = () => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/report?type=lost")}
      className="cursor-pointer bg-gray-900 hover:bg-gray-800 text-white p-6 rounded-2xl shadow-md transition w-full md:w-1/3 text-center border border-gray-700"
    >
      <h3 className="text-xl font-semibold mb-2">Report Lost Item</h3>
      <p className="text-sm text-gray-400">
        Misplaced something while traveling? Let us help you find it.
      </p>
    </div>
  );
};

export default LostItemCard;
