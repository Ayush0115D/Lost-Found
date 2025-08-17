import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const faqs = [
  {
    question: "How do I report a lost item?",
    answer: `You can report a lost item using our online form on the homepage. 
    Please provide accurate details including:
    • Station name
    • Item description
    • Date of loss
    • Your metro card or QR code number.`,
  },
  {
    question: "How can I track my lost item report?",
    answer: `You can track your report by entering your Report ID in the “Track Report” section of our website. 
    This will show you the current status of your item.`,
  },
  {
    question: "How long does it take to verify and approve a claim?",
    answer: `Verification usually takes  hours. 
    Our team checks your submitted details against the found items database to ensure it’s a match before approving the claim.`,
  },
  {
    question: "What happens to unclaimed items after 5 days?",
    answer: `Unclaimed items are securely transferred to the central hub at Kashmere Gate after 5 days. 
    You may visit there with your original ID and reference number to claim your item.`,
  },
  {
    question: "Can I upload multiple images of a lost item?",
    answer: `Currently, you can upload only one image per lost or found item report. 
    Make sure it clearly shows the item and any unique markings.`,
  },
  {
    question: "What should I do if I found someone else’s item?",
    answer: `Please submit a 'Found Item' form with the station, date, and details. 
    This helps our system match it with any lost reports and notify the rightful owner.`,
  },
  {
    question: "Is there a fee for claiming my lost item?",
    answer: `No, there is no fee for claiming lost items. 
    However, you must provide valid proof of ownership and a government-issued ID.`,
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const navigate = useNavigate();

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white px-6 py-12 relative">
      {/* Top Bar with Back Button & Heading */}
      <div className="flex items-center justify-between mb-10 relative">
       {/* Back Button */}
<button
  onClick={() => navigate("/")}
  className="flex items-center gap-2 px-5 py-2.5 mb-6 rounded-lg 
             bg-gray-700 hover:bg-gray-800 
             text-white font-medium shadow-md 
             transition-all duration-300 transform hover:-translate-y-0.5 hover:scale-105"
>
  <span className="text-lg">←</span>
  <span>Back to Home</span>
</button>


        {/* Heading Centered */}
        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-3xl font-bold text-blue-400">
          Frequently Asked Questions
        </h1>
      </div>

      {/* FAQ List */}
      <div className="max-w-4xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-[#1E1E1E] rounded-lg shadow-lg overflow-hidden hover:shadow-blue-500/20 transition-all duration-300"
          >
            {/* Question */}
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center px-6 py-4 text-left text-lg font-semibold text-blue-300 hover:text-blue-400 transition-colors"
            >
              {faq.question}
              {openIndex === index ? (
                <FaChevronUp className="text-blue-400" />
              ) : (
                <FaChevronDown className="text-blue-400" />
              )}
            </button>

            {/* Animated Answer */}
            <div
              className={`transition-all duration-500 ease-in-out overflow-hidden ${
                openIndex === index
                  ? "max-h-96 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="px-6 pb-6 pt-2 text-gray-300 border-t border-gray-700">
                {faq.answer.split("\n").map((line, i) => (
                  <p key={i} className="mb-3 leading-relaxed">
                    {line.trim()}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
