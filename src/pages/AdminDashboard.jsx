import React, { useState } from "react";
import ItemTable from "../components/ItemTable";

const tabs = ["Lost Items", "Found Items", "Claimed Items"];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("Lost Items");

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#2c2c2c] p-6 space-y-4">
        <h2 className="text-2xl font-bold text-blue-400 mb-4">Admin Panel</h2>
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`w-full text-left px-3 py-2 rounded-md font-medium ${
              activeTab === tab
                ? "bg-blue-600 text-white"
                : "bg-[#3a3a3a] text-gray-300 hover:bg-blue-500 hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-semibold text-blue-300 mb-6">
          {activeTab}
        </h1>
        <ItemTable type={activeTab} />
      </main>
    </div>
  );
};

export default AdminDashboard;
