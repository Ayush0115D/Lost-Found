import React, { useEffect, useState } from "react";

const ItemTable = () => {
  const [items, setItems] = useState([]);
  const [filterType, setFilterType] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [loading, setLoading] = useState(true);

  // Fetch items from backend
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin/items", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        setItems(data);
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  // Claim an item
  const handleClaim = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/admin/items/${id}/claim`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.ok) {
        const updatedItem = await res.json();
        setItems((prev) =>
          prev.map((item) => (item._id === updatedItem._id ? updatedItem : item))
        );
      } else {
        console.error("Failed to mark as claimed");
      }
    } catch (error) {
      console.error("Error claiming item:", error);
    }
  };

  // Delete an item
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/admin/items/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.ok) {
        setItems((prev) => prev.filter((item) => item._id !== id));
      } else {
        console.error("Failed to delete item");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  // Filter + Search + Sort
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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0c2a] text-white flex items-center justify-center">
        <p className="text-lg">🔄 Loading items...</p>
      </div>
    );
  }

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
              <th className="p-3">Metro Card/QR</th>
              <th className="p-3">Place Found</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item) => (
              <tr key={item._id || item.id} className="border-b hover:bg-gray-100 transition">
                <td className="p-2">
                  <img
                    src={item.image}
                    alt={item.itemName}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="p-2">{item.itemName}</td>
                <td className="p-2">{item.station}</td>
                <td className="p-2">{new Date(item.date).toLocaleDateString()}</td>
                <td className="p-2">{item.type}</td>
                <td className="p-2">{item.status}</td>
                <td className="p-2">{item.metroCardOrQR}</td>
                <td className="p-2">{item.type === "Found Item" ? item.place : "N/A"}</td>
                <td className="p-2 space-x-2">
                  <button
                    onClick={() => handleClaim(item._id || item.id)}
                    disabled={item.status === "Claimed"}
                    className={`px-3 py-1 rounded text-sm font-medium ${
                      item.status === "Claimed"
                        ? "bg-gray-400 text-white cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700 text-white"
                    }`}
                  >
                    {item.status === "Claimed" ? "Claimed" : "Mark as Claimed"}
                  </button>
                  <button
                    onClick={() => handleDelete(item._id || item.id)}
                    className="px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-white text-sm font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* No Items */}
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
