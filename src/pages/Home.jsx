import React from "react";
import MetroNetworkCard from "../components/MetroNetworkCard";
import FeatureSection from "../components/FeatureSection";
import Footer from "../components/DMRCFooter";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white flex flex-col items-center px-4 py-8 space-y-12">
      {/* Your original buttons section */}
      <h1 className="text-4xl font-bold text-center mb-6">DMRC Lost & Found</h1>
      <div className="flex space-x-6 mb-10">
        <a
          href="/report?type=lost"
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl text-lg font-semibold shadow-lg"
        >
          Report Lost Item
        </a>
        <a
          href="/report?type=found"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl text-lg font-semibold shadow-lg"
        >
          Report Found Item
        </a>
      </div>

      {/* Metro Network Card */}
      <MetroNetworkCard />

      {/* New Feature Cards Section */}
      <FeatureSection />

      {/* Footer - Placed at the end */}
      <Footer />
    </div>
  );
};
export default Home;
