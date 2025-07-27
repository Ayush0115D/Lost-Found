import React from "react";
import { useNavigate } from "react-router-dom";
import { BadgeCheck } from "lucide-react";
import { motion } from "framer-motion";

const VerificationCard = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/verify");
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-[#0d1b2a] rounded-2xl shadow-lg p-6 md:p-8 w-full max-w-md text-center border border-[#1c2f40]"
    >
      <div className="flex justify-center mb-4">
        <BadgeCheck className="w-10 h-10 text-red-600" />
      </div>
      <h2 className="text-2xl font-bold text-white mb-2">Verify & Claim</h2>
      <p className="text-gray-300 mb-6 text-sm md:text-base">
        Already reported an item? Verify and claim it securely with your report ID.
      </p>
      <button
        onClick={handleClick}
        className="bg-red-600 hover:bg-red-700 font-semibold text-white px-5 py-2 rounded-full transition"
      >
        Verify Claim
      </button>
    </motion.div>
  );
};
export default VerificationCard;