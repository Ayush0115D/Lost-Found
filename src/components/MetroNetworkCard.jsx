// src/components/MetroNetworkCard.jsx
import React from "react";

const metroLines = [
  { name: "Red Line", color: "bg-red-500", stations: 29 },
  { name: "Blue Line", color: "bg-blue-500", stations: 50 },
  { name: "Green Line", color: "bg-green-500", stations: 21 },
  { name: "Yellow Line", color: "bg-yellow-400", stations: 37 },
  { name: "Violet Line", color: "bg-violet-500", stations: 35 },
  { name: "Pink Line", color: "bg-pink-500", stations: 38 },
  { name: "Magenta Line", color: "bg-fuchsia-600", stations: 25 },
  { name: "Airport Express", color: "bg-orange-500", stations: 6 },
];

export default function MetroNetworkCard() {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 mt-10 mx-auto max-w-4xl">
      <h2 className="text-xl md:text-2xl font-bold text-center text-blue-800 mb-2">
        Complete Metro Network Coverage
      </h2>
      <p className="text-sm md:text-base text-center text-blue-700 mb-6">
        Service available across all Delhi Metro lines
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 justify-items-center">
        {metroLines.map((line) => (
          <div key={line.name} className="flex items-center gap-2">
            <span className={`w-3 h-3 rounded-full ${line.color}`}></span>
            <span className="text-blue-900 font-medium text-sm sm:text-base">
              {line.name}
            </span>
            <span className="text-blue-600 text-sm">({line.stations} Stations)</span>
          </div>
        ))}
      </div>
    </div>
  );
}
