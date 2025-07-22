import React from "react";
import Header from "../components/Header";
import MetroNetworkCard from "../components/MetroNetworkCard";
import FeatureSection from "../components/FeatureSection";
import Footer from "../components/DMRCFooter";
import LostItemCard from "../components/LostItemCard";
import FoundItemCard from "../components/FoundItemCard";
import VerificationCard from "../components/VerificationCard";

function Home() {
  return (
    <div className="bg-[#1e1e1e] text-blue-50 min-h-screen">
      <Header />

      {/* Hero Section */}
      <div
        className="mt-16 text-center px-4"
        data-aos="fade-up"
        data-aos-duration="800"
      >
        <h1 className="text-5xl font-bold mb-4 text-white tracking-tight">
          Lost & Found Portal <span className="text-blue-400">– DMRC</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 italic">
          Helping you reconnect with what matters most.
        </p>
        <div className="mt-4 flex justify-center">
          <div className="h-1 w-24 bg-blue-500 rounded-full"></div>
        </div>
      </div>

      {/* Button Cards */}
      <div
        className="mt-12 flex flex-col md:flex-row justify-center gap-6 px-4"
        data-aos="zoom-in-up"
        data-aos-duration="1000"
      >
        <LostItemCard />
        <FoundItemCard />
      </div>

      {/* Verification Card (shifted slightly right) */}
   <div
  className="mt-12 px-4 ml-8 md:ml-24 flex items-center justify-center h-64"
  data-aos="fade-up"
  data-aos-duration="1000"
>
  <VerificationCard />
</div>

      {/* Features Section */}
      <div
        className="mt-12 px-4"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <FeatureSection />
      </div>

      {/* Metro Network Section */}
      <div
        className="mt-12 px-4"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
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
