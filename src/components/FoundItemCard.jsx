// src/components/FoundItemCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const FoundItemCard = () => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/report?type=found")}
      className="cursor-pointer bg-gray-900 hover:bg-gray-800 text-white p-6 rounded-2xl shadow-md transition w-full md:w-1/3 text-center border border-gray-700"
    >
      <h3 className="text-xl font-semibold mb-2">Report Found Item</h3>
      <p className="text-sm text-gray-400">
        Spotted an item? Submit a report and help it return to its owner.
      </p>
    </div>
  );
};

export default FoundItemCard;
