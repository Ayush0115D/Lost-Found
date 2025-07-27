import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import MetroNetworkCard from "../components/MetroNetworkCard";
import FeatureSection from "../components/FeatureSection";
import Footer from "../components/DMRCFooter";
import LostItemCard from "../components/LostItemCard";
import FoundItemCard from "../components/FoundItemCard";
import VerificationCard from "../components/VerificationCard";
import axios from "axios";

function Home() {
  const [lostItems, setLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const [lostRes, foundRes] = await Promise.all([
          axios.get("http://localhost:5000/api/lost"),
          axios.get("http://localhost:5000/api/found"),
        ]);
        setLostItems(lostRes.data);
        setFoundItems(foundRes.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching items:", err);
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  return (
    <div className="bg-[#1e1e1e] text-blue-50 min-h-screen">
      <Header />

      {/* Hero Section */}
      <div className="mt-16 text-center px-4" data-aos="fade-up" data-aos-duration="800">
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

      {/* All Three Cards Together */}
      <div className="mt-12 flex flex-col md:flex-row justify-center gap-6 px-4 flex-wrap" data-aos="zoom-in-up" data-aos-duration="1000">
        <LostItemCard />
        <FoundItemCard />
        <VerificationCard />
      </div>

      {/* Latest Lost Items */}
      <div className="mt-12 px-4" data-aos="fade-up" data-aos-duration="1000">
        {loading ? (
          <p className="text-gray-300">Loading...</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-4">
            {lostItems.slice(0, 3).map((item) => (
              <div key={item._id} className="bg-[#2c2c2c] rounded-md p-4 shadow-md">
                <img src={`http://localhost:5000/uploads/${item.image}`} alt={item.description} className="h-40 w-full object-cover rounded mb-2" />
                <h3 className="text-white font-semibold">{item.description}</h3>
                <p className="text-gray-400 text-sm">Station: {item.station}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Latest Found Items */}
      <div className="mt-12 px-4" data-aos="fade-up" data-aos-duration="1000">
        {loading ? (
          <p className="text-gray-300">Loading...</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-4">
            {foundItems.slice(0, 3).map((item) => (
              <div key={item._id} className="bg-[#2c2c2c] rounded-md p-4 shadow-md">
                <img src={`http://localhost:5000/uploads/${item.image}`} alt={item.description} className="h-40 w-full object-cover rounded mb-2" />
                <h3 className="text-white font-semibold">{item.description}</h3>
                <p className="text-gray-400 text-sm">Place: {item.place}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Features Section */}
      <div className="mt-12 px-4" data-aos="fade-up" data-aos-duration="1000">
        <FeatureSection />
      </div>

      {/* Metro Network */}
      <div className="mt-12 px-4" data-aos="fade-up" data-aos-duration="1000">
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
