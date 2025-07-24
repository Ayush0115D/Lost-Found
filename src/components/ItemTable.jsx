// src/components/ItemTable.jsx
import React from "react";

const dummyData = [
  {
    id: 1,
    type: "Lost Items",
    itemName: "Black Wallet",
    station: "Rajiv Chowk",
    date: "2025-07-20",
    status: "Pending",
    image: "https://via.placeholder.com/80",
  },
  {
    id: 2,
    type: "Found Items",
    itemName: "Silver Watch",
    station: "Kashmere Gate",
    date: "2025-07-18",
    status: "Claimed",
    image: "https://via.placeholder.com/80",
  },
  {
    id: 3,
    type: "Lost Items",
    itemName: "Blue Backpack",
    station: "Lajpat Nagar",
    date: "2025-07-19",
    status: "Pending",
    image: "https://via.placeholder.com/80",
  },
];

const ItemTable = ({ type }) => {
  const filtered = dummyData.filter((item) =>
    type === "Claimed Items" ? item.status === "Claimed" : item.type === type
  );

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-left text-gray-300">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="px-4 py-3">Image</th>
            <th className="px-4 py-3">Item Name</th>
            <th className="px-4 py-3">Station</th>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((item) => (
            <tr
              key={item.id}
              className="border-b border-gray-700 hover:bg-[#2a2a2a]"
            >
              <td className="px-4 py-3">
                <img
                  src={item.image}
                  alt="item"
                  className="w-16 h-16 rounded shadow"
                />
              </td>
              <td className="px-4 py-3">{item.itemName}</td>
              <td className="px-4 py-3">{item.station}</td>
              <td className="px-4 py-3">{item.date}</td>
              <td className="px-4 py-3">
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    item.status === "Claimed"
                      ? "bg-green-600 text-white"
                      : "bg-yellow-600 text-white"
                  }`}
                >
                  {item.status}
                </span>
              </td>
              <td className="px-4 py-3">
                <div className="flex gap-2">
                  <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm">
                    Mark Claimed
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filtered.length === 0 && (
        <p className="text-center mt-8 text-gray-400 italic">
          No data available.
        </p>
      )}
    </div>
  );
};

export default ItemTable;
