import React, { useEffect, useState } from "react";
import ItemTable from "../components/ItemTable";

const Admin = () => {
  const [isAuthorized, setIsAuthorized] = useState(null);
  const [userEmail, setUserEmail] = useState("");

  // Static dummy stats for frontend-only display
  const stats = {
    totalItems: 128,
    claimedItems: 84,
    lostItems: 48,
    foundItems: 80,
  };

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    setUserEmail(email);

    if (
      email === "dhakreayush578@gmail.com" ||
      (email && email.endsWith("@dmrc.org"))
    ) {
      setIsAuthorized(true);
    } else {
      setIsAuthorized(false);
    }
  }, []);

  if (isAuthorized === null)
    return <div className="min-h-screen bg-[#0f172a]"></div>;

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-[#0f172a] text-red-500 flex items-center justify-center">
        <h2 className="text-xl font-semibold">
          ⚠️ Unauthorized Access — Admins only
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-blue-300 p-6">
      {/* Heading */}
      <h1 className="text-3xl font-extrabold mb-2 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600 drop-shadow-sm">
        Admin Panel Dashboard
      </h1>

      {/* Welcome Message */}
      <p className="text-center mb-6 text-gray-300">
        Welcome,{" "}
        <span className="font-semibold text-blue-400">{userEmail}</span> <br />
        You are logged in as a{" "}
        <span className="italic text-green-400">DMRC Official</span>.
      </p>

      {/* Admin Quick Stats */}
      <h2 className="text-xl font-semibold text-blue-200 mb-4 text-left underline decoration-blue-500 decoration-2">
        🔍 Admin Quick Stats
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-[#1e293b] p-4 rounded-lg shadow border border-blue-800">
          <p className="text-gray-400 text-sm">Total Items</p>
          <p className="text-2xl font-bold text-cyan-400">{stats.totalItems}</p>
        </div>
        <div className="bg-[#1e293b] p-4 rounded-lg shadow border border-green-800">
          <p className="text-gray-400 text-sm">Claimed</p>
          <p className="text-2xl font-bold text-green-400">{stats.claimedItems}</p>
        </div>
        <div className="bg-[#1e293b] p-4 rounded-lg shadow border border-yellow-700">
          <p className="text-gray-400 text-sm">Lost Items</p>
          <p className="text-2xl font-bold text-yellow-400">{stats.lostItems}</p>
        </div>
        <div className="bg-[#1e293b] p-4 rounded-lg shadow border border-blue-700">
          <p className="text-gray-400 text-sm">Found Items</p>
          <p className="text-2xl font-bold text-blue-400">{stats.foundItems}</p>
        </div>
      </div>

      {/* Item Table */}
      <ItemTable />
    </div>
  );
};

export default Admin;
