import React, { useState } from "react";
import dummyData from "../data/dummyData";

function ItemTable() {
  const [filterType, setFilterType] = useState("All");

  const filteredItems =
    filterType === "All"
      ? dummyData
      : dummyData.filter((item) => item.type === filterType);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Side Panel */}
        <div className="md:w-1/5">
          <h2 className="text-xl font-semibold mb-4">Categories</h2>
          <ul className="space-y-2">
            {["All", "Lost", "Found", "Claimed"].map((type) => (
              <li key={type}>
                <button
                  onClick={() => setFilterType(type)}
                  className={`w-full text-left px-4 py-2 rounded-lg ${
                    filterType === type
                      ? "bg-blue-600 text-white"
                      : "bg-gray-800 hover:bg-blue-700"
                  }`}
                >
                  {type} Items
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Table Section */}
        <div className="md:w-4/5">
          <h1 className="text-3xl font-bold mb-6">
            {filterType} Items ({filteredItems.length})
          </h1>
          <div className="overflow-x-auto">
            <table className="w-full table-auto bg-white text-black rounded-lg overflow-hidden">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="p-3">Image</th>
                  <th className="p-3">Item Name</th>
                  <th className="p-3">Station</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-100">
                    <td className="p-3 text-center">
                      <img
                        src={item.image}
                        alt={item.itemName}
                        className="w-16 h-16 object-cover rounded-md mx-auto"
                      />
                    </td>
                    <td className="p-3 text-center">{item.itemName}</td>
                    <td className="p-3 text-center">{item.station}</td>
                    <td className="p-3 text-center">{item.date}</td>
                    <td className="p-3 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          item.status === "Claimed"
                            ? "bg-green-200 text-green-800"
                            : "bg-yellow-200 text-yellow-800"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {filteredItems.length === 0 && (
                  <tr>
                    <td
                      colSpan="5"
                      className="p-4 text-center text-gray-500 italic"
                    >
                      No items found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemTable;
