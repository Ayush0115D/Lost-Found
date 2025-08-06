import React, { useEffect, useState } from "react";

const ItemTable = () => {
  const [items, setItems] = useState([]);
  const [filterType, setFilterType] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch("/api/admin/items", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await res.json();
        console.log("✅ Fetched items from backend:", data);
        setItems(data);
      } catch (error) {
        console.error("❌ Error fetching items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handleClaim = async (id) => {
    try {
      const res = await fetch(`/api/admin/items/${id}/claim`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.ok) {
        const updatedItem = await res.json();
        const updatedId = updatedItem._id || updatedItem.id;

        setItems((prev) =>
          prev.map((item) =>
            item.id === updatedId ? { ...item, status: "Claimed" } : item
          )
        );
      } else {
        console.error("❌ Failed to mark as claimed");
      }
    } catch (error) {
      console.error("❌ Error claiming item:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/admin/items/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.ok) {
        setItems((prev) => prev.filter((item) => item.id !== id));
      } else {
        console.error("❌ Failed to delete item");
      }
    } catch (error) {
      console.error("❌ Error deleting item:", error);
    }
  };

  const filteredItems = items
    .filter((item) =>
      filterType === "All" ? true : item.type === filterType
    )
    .filter((item) =>
      (item.itemDescription || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "date") return new Date(b.date) - new Date(a.date);
      if (sortBy === "name")
        return (a.itemDescription || "").localeCompare(b.itemDescription || "");
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

      {/* Controls */}
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          className="p-2 rounded bg-[#1a1b3c] text-white border border-gray-600"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Lost Item">Lost Items</option>
          <option value="Found Item">Found Items</option>
        </select>

        <input
          type="text"
          className="p-2 rounded bg-[#1a1b3c] text-white border border-gray-600 placeholder-gray-400"
          placeholder="Search item..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="p-2 rounded bg-[#1a1b3c] text-white border border-gray-600"
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
              <th className="p-3">Report ID</th> {/* ✅ Added */}
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
                <td className="p-2">{item.itemDescription || "Unknown"}</td>
                <td className="p-2">{item.station || "Unknown"}</td>
                <td className="p-2">
                  {item.date
                    ? new Date(item.date).toLocaleDateString("en-IN")
                    : "Unknown"}
                </td>
                <td className="p-2">{item.type || "Unknown"}</td>
                <td className="p-2">{item.status || "Unclaimed"}</td>
                <td className="p-2">{item.metroCardOrQR || "N/A"}</td>
                <td className="p-2">
                  {item.type === "Found Item" ? item.place || "N/A" : "N/A"}
                </td>
                <td className="p-2 font-mono">{item.reportId || "N/A"}</td> {/* ✅ Added */}
                <td className="p-2 space-x-2">
                  <button
                    onClick={() => handleClaim(item.id)}
                    disabled={item.status === "Claimed"}
                    className={`px-3 py-1 rounded text-sm font-medium ${
                      item.status === "Claimed"
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700"
                    } text-white`}
                  >
                    {item.status === "Claimed" ? "Claimed" : "Mark Claimed"}
                  </button>
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
