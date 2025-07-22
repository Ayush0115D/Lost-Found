import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LocateFixed } from "lucide-react";

const LostItemCard = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="cursor-pointer bg-gray-900 hover:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700 transition w-full md:w-1/3 text-center"
    >
      <div className="flex justify-center mb-4">
        <LocateFixed className="h-10 w-10 text-blue-400" />
      </div>
      <h3 className="text-xl font-semibold mb-2">Lost an Item?</h3>
      <p className="text-gray-400 mb-4">Submit a report to help us locate it quickly.</p>
      <button
        onClick={() => navigate("/report?type=lost")}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition"
      >
        Report Lost Item
      </button>
    </motion.div>
  );
};

export default LostItemCard;
