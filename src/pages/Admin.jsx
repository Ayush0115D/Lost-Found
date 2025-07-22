import React from "react";
import ItemTable from "../components/ItemTable";

const Admin = () => {
  return (
    <div className="min-h-screen bg-[#0f172a] text-blue-300 p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Panel Dashboard</h1>
      <ItemTable />
    </div>
  );
};

export default Admin;
