import React from "react";
import Header from "../components/Header";
import MetroNetworkCard from "../components/MetroNetworkCard";
import FeatureSection from "../components/FeatureSection";
import Footer from "../components/DMRCFooter";
import { useNavigate } from "react-router-dom";
import VerificationCard from "../components/VerificationCard";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#1e1e1e] text-blue-50 min-h-screen">
      <Header />

      <div className="mt-16 text-center px-4">
        <h1 className="text-4xl font-bold mb-2">Lost & Found Portal - DMRC</h1>
        <p className="text-lg text-gray-300">
          Helping you recover what's important
        </p>
      </div>

      {/* Button Cards */}
      <div className="mt-12 flex flex-col md:flex-row justify-center gap-6 px-4">
        <div
          onClick={() => navigate("/report?type=lost")}
          className="cursor-pointer bg-gray-900 hover:bg-gray-800 text-white p-6 rounded-2xl shadow-md transition w-full md:w-1/3 text-center border border-gray-700"
        >
          <h3 className="text-xl font-semibold mb-2">Report Lost Item</h3>
          <p className="text-sm text-gray-400">
            Misplaced something while traveling? Let us help you find it.
          </p>
        </div>

        <div
          onClick={() => navigate("/report?type=found")}
          className="cursor-pointer bg-gray-900 hover:bg-gray-800 text-white p-6 rounded-2xl shadow-md transition w-full md:w-1/3 text-center border border-gray-700"
        >
          <h3 className="text-xl font-semibold mb-2">Report Found Item</h3>
          <p className="text-sm text-gray-400">
            Spotted an item? Submit a report and help it return to its owner.
          </p>
        </div>
      </div>

      {/* Verification Card */}
      <div className="mt-12 px-4">
        <VerificationCard />
      </div>

      {/* Feature Section */}
      <div className="mt-12 px-4">
        <FeatureSection />
      </div>

      {/* Metro Network Section */}
      <div className="mt-12 px-4">
        <MetroNetworkCard />
      </div>

      {/* Footer */}
      <div className="mt-12">
        <Footer />
      </div>
    </div>
  );
}

export default Home;
