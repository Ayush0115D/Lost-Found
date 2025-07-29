import React, { useEffect, useState } from "react";
import ItemTable from "../components/ItemTable";

const Admin = () => {
  const [isAuthorized, setIsAuthorized] = useState(null); // null = loading, true/false = decision
  const [userEmail, setUserEmail] = useState("");

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

  // While checking auth, show nothing (avoids flash)
  if (isAuthorized === null) return <div className="min-h-screen bg-[#0f172a]"></div>;

  // If unauthorized, show blank screen + message
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-[#0f172a] text-red-500 flex items-center justify-center">
        <h2 className="text-xl font-semibold">
          ⚠️ Unauthorized Access — Admins only
        </h2>
      </div>
    );
  }

  // If authorized, show admin content
  return (
    <div className="min-h-screen bg-[#0f172a] text-blue-300 p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Panel Dashboard</h1>
      <ItemTable />
    </div>
  );
};

export default Admin;
