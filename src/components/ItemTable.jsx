import React, { useEffect, useState } from "react";
import axios from "axios";

const ItemTable = () => {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get("/api/admin/items");
        setItems(res.data);
      } catch (err) {
        console.error("Error fetching items", err);
      }
    };

    fetchItems();
  }, []);

  const handleClaim = async (id) => {
    try {
      await axios.put(`/api/admin/items/${id}/claim`);
      setItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: "Claimed" } : item
        )
      );
    } catch (err) {
      console.error("Error updating claim status", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/admin/items/${id}`);
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Error deleting item", err);
    }
  };

  const filteredItems =
    filter === "All" ? items : items.filter((item) => item.type === filter);

  return (
    <div className="overflow-x-auto">
      <div className="mb-4 flex items-center gap-4">
        <label className="font-medium text-gray-700">Filter:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-300 rounded px-3 py-1"
        >
          <option value="All">All</option>
          <option value="Lost Item">Lost Items</option>
          <option value="Found Item">Found Items</option>
        </select>
      </div>

      <table className="min-w-full table-auto border border-gray-300 shadow-md">
        <thead className="bg-gray-500 text-white">
          <tr>
            <th className="p-3">Image</th>
            <th className="p-3">Place Found</th> {/* 👈 Moved here */}
            <th className="p-3">Item</th>
            <th className="p-3">Station</th>
            <th className="p-3">Date</th>
            <th className="p-3">Type</th>
            <th className="p-3">Name</th>
            <th className="p-3">Metro Card/QR</th>
            <th className="p-3">Report ID</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((item) => (
            <tr key={item.id} className="border-b hover:bg-gray-100 transition">
              <td className="p-2">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.itemDescription || "Item"}
                    className="w-16 h-16 object-cover rounded"
                  />
                ) : (
                  <span className="text-gray-500">No Image</span>
                )}
              </td>
              <td className="p-2">
                {item.type === "Found Item" ? item.place || "N/A" : "N/A"}
              </td>
              <td className="p-2">{item.itemDescription || "Unknown"}</td>
              <td className="p-2">{item.station || "Unknown"}</td>
              <td className="p-2">
                {item.date
                  ? new Date(item.date).toLocaleDateString("en-IN")
                  : "Unknown"}
              </td>
              <td className="p-2">{item.type || "Unknown"}</td>
              <td className="p-2">{item.fullName || "N/A"}</td>
              <td className="p-2">{item.metroCardOrQR || "N/A"}</td>
              <td className="p-2 font-mono">{item.reportId || "N/A"}</td>
              <td className="p-2 space-y-2">
                {item.status !== "Claimed" ? (
                  <button
                    onClick={() => handleClaim(item.id)}
                    className="block w-full px-3 py-1 rounded bg-green-600 hover:bg-green-700 text-white text-sm font-medium"
                  >
                    Mark Claimed
                  </button>
                ) : (
                  <button
                    disabled
                    className="block w-full px-3 py-1 rounded bg-gray-500 text-white text-sm font-medium cursor-not-allowed"
                  >
                    ✅ Claimed
                  </button>
                )}

                <button
                  onClick={() => handleDelete(item.id)}
                  className="block w-full px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-white text-sm font-medium"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemTable;
