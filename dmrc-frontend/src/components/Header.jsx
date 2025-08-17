import React from "react";
import dmrc from "../assets/dmrc.png"; // Make sure this path is correct

const Header = () => {
  return (
    <header className="w-full bg-[#0f0f0f] py-4 px-6 shadow-md flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <img src={dmrc} alt="DMRC Logo" className="h-10 w-10 object-contain" />
        <h1 className="text-2xl font-bold text-blue-100">Delhi Metro Rail Corporation</h1>
      </div>
    </header>
  );
};

export default Header;
