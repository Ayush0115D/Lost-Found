import React, { useState } from "react";
import dummyData from "../data/dummyData";

const ItemTable = () => {
  const [filterType, setFilterType] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [items, setItems] = useState(dummyData); // track deletions & status changes

  const handleClaim = (id) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, status: "Claimed" } : item
    );
    setItems(updatedItems);
  };

  const handleDelete = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
  };

  const filteredItems = items
    .filter((item) =>
      filterType === "All" ? true : item.type === filterType
    )
    .filter((item) =>
      item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "date") return new Date(b.date) - new Date(a.date);
      if (sortBy === "name") return a.itemName.localeCompare(b.itemName);
    });

  return (
    <div className="p-6 text-white min-h-screen bg-[#0b0c2a]">
      <h2 className="text-2xl font-bold mb-4">Item Records</h2>

      {/* Form Controls */}
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          className="p-2 rounded bg-[#1a1b3c] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Lost Item">Lost Items</option>
          <option value="Found Item">Found Items</option>
        </select>

        <input
          type="text"
          className="p-2 rounded bg-[#1a1b3c] text-white border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Search item..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="p-2 rounded bg-[#1a1b3c] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="date">Sort by Date</option>
          <option value="name">Sort by Name</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg">
        <table className="w-full text-left bg-blue-100 text-black rounded-lg">
          <thead className="bg-gray-500 text-white">
            <tr>
              <th className="p-3">Image</th>
              <th className="p-3">Item</th>
              <th className="p-3">Station</th>
              <th className="p-3">Date</th>
              <th className="p-3">Type</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item) => (
              <tr
                key={item.id}
                className="border-b hover:bg-gray-100 transition"
              >
                <td className="p-2">
                  <img
                    src={item.image}
                    alt={item.itemName}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="p-2">{item.itemName}</td>
                <td className="p-2">{item.station}</td>
                <td className="p-2">{item.date}</td>
                <td className="p-2">{item.type}</td>
                <td className="p-2">{item.status}</td>
                <td className="p-2 space-x-2">
                  {/* Mark as Claimed Button */}
                  <button
                    onClick={() => handleClaim(item.id)}
                    disabled={item.status === "Claimed"}
                    className={`px-3 py-1 rounded text-sm font-medium ${
                      item.status === "Claimed"
                        ? "bg-gray-400 text-white cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700 text-white"
                    }`}
                  >
                    {item.status === "Claimed" ? "Claimed" : "Mark as Claimed"}
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-white text-sm font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* No Items Message */}
        {filteredItems.length === 0 && (
          <div className="text-center py-6 text-gray-400">
            No items match your criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemTable;
