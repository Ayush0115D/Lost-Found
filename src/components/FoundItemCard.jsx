import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LocateFixed } from "lucide-react";

const FoundItemCard = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="cursor-pointer bg-gray-900 hover:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700 transition w-full md:w-1/3 text-center"
    >
      <div className="flex justify-center mb-4">
        <LocateFixed className="h-10 w-10 text-green-400" />
      </div>
      <h3 className="text-xl font-semibold mb-2">Found an Item?</h3>
      <p className="text-gray-400 mb-4">Let us know so the rightful owner can claim it.</p>
      <button
        onClick={() => navigate("/report?type=found")}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full transition"
      >
        Report Found Item
      </button>
    </motion.div>
  );
};

export default FoundItemCard;
