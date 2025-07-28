import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ItemTable from "../components/ItemTable";

const Admin = () => {
  const navigate = useNavigate();

  // Get user email from localStorage (you must store this at login time)
  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    const isAllowed =
      userEmail === "dhakreayush578@gmail.com" || userEmail?.endsWith("@dmrc.org");

    if (!isAllowed) {
      alert("❌ Access Denied: You are not authorized to view the Admin Panel.");
      navigate("/"); // Redirect to home
    }
  }, [userEmail, navigate]);

  return (
    <div className="min-h-screen bg-[#0f172a] text-blue-300 p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Panel Dashboard</h1>
      <ItemTable />
    </div>
  );
};

export default Admin;
