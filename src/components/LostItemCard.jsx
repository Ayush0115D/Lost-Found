import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LocateFixed } from "lucide-react";

const LostItemCard = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      onClick={() => navigate("/report?type=lost")}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="cursor-pointer bg-gray-900 hover:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700 transition w-full md:w-1/3 text-center"
    >
      <div className="flex justify-center mb-4">
        <LocateFixed className="w-10 h-10 text-white" />
      </div>
      <h3 className="text-xl font-bold text-blue-50 mb-2">Lost an Item?</h3>
      <p className="text-gray-300 mb-4 font-bold">
        Report your lost item here and we’ll help you track it down.
      </p>
      <button className="bg-white text-gray-900 font-bold py-2 px-4 rounded-full transition hover:bg-gray-200">
        Report Lost Item
      </button>
    </motion.div>
  );
};

export default LostItemCard;
