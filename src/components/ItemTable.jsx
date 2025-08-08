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
        setItems(data);
      } catch (error) {
        console.error("❌ Error fetching items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

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

  const handleClaim = async (id) => {
    try {
      const res = await fetch(`/api/admin/items/${id}/claim`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.ok) {
        setItems((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, status: "Claimed" } : item
          )
        );
      } else {
        console.error("❌ Failed to mark as claimed");
      }
    } catch (error) {
      console.error("❌ Error claiming item:", error);
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
      if (sortBy === "name") {
        return (a.fullName || "").toLowerCase().localeCompare((b.fullName || "").toLowerCase());
      }
    });

  return (
    <div className="p-6 text-white min-h-screen bg-[#0b0c2a]">
      <h2 className="text-3xl font-extrabold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">
        Item Records
      </h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          className="p-2 rounded bg-[#1a1b3c] text-white border border-gray-600 transition duration-200 hover:border-blue-400"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Lost Item">Lost Items</option>
          <option value="Found Item">Found Items</option>
        </select>

        <input
          type="text"
          className="p-2 rounded bg-[#1a1b3c] text-blue-300 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-500"
          placeholder="Search item..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="p-2 rounded bg-[#1a1b3c] text-white border border-gray-600 transition duration-200 hover:border-blue-400"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="date">Sort by Date</option>
          <option value="name">Sort by Name</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl shadow-2xl animate-fade-in">
        <table className="w-full text-left bg-blue-100 text-black rounded-xl border border-blue-300">
          <thead className="bg-blue-900 text-white">
            <tr>
              <th className="p-8 w-[220px]">IMAGE</th>
              <th className="p-8">Full Name</th>
              <th className="p-8">Contact Number</th>
              <th className="p-8">Item Description</th>
              <th className="p-8">Station</th>
              <th className="p-8">Date</th>
              <th className="p-8">Type</th>
              <th className="p-8">Metro Card/QR ID</th>
              <th className="p-8">Place Found</th>
              <th className="p-8">Report ID</th>
              <th className="p-8">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item, index) => (
              <tr
                key={item.id}
                className="border-b border-blue-200 hover:bg-blue-200 hover:shadow-lg hover:scale-[1.01] transition-all duration-300 ease-in-out animate-fade-in delay-[100ms]"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <td className="p-2 w-[200px]">
                  {item.image ? (
                    <a
                      href={item.image}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={item.image}
                        alt={item.itemDescription || "Item"}
                        className="w-full max-h-40 object-contain rounded border border-gray-300 shadow-sm hover:scale-105 transition-transform duration-200"
                      />
                    </a>
                  ) : (
                    <span className="text-gray-500">No Image</span>
                  )}
                </td>
                <td className="p-2">{item.fullName || "N/A"}</td>
                <td className="p-2">{item.contactNumber || "N/A"}</td>
                <td className="p-2">{item.itemDescription || "Unknown"}</td>
                <td className="p-2">{item.station || "Unknown"}</td>
                <td className="p-2">
                  {item.date
                    ? new Date(item.date).toLocaleDateString("en-IN")
                    : "Unknown"}
                </td>
                <td className="p-2">{item.type || "Unknown"}</td>
                <td className="p-2">{item.metroCardOrQR || "N/A"}</td>
                <td className="p-2">
                  {item.type === "Found Item" ? item.place || "N/A" : "N/A"}
                </td>
                <td className="p-2 font-mono">{item.reportId || "N/A"}</td>
                <td className="p-2 space-y-2">
                  {item.status === "Claimed" ? (
                    <button
                      disabled
                      className="block w-full px-3 py-1 rounded bg-gray-300 text-gray-700 text-sm font-semibold border border-gray-400 cursor-not-allowed"
                    >
                      Claimed
                    </button>
                  ) : (
                    <button
                      onClick={() => handleClaim(item.id)}
                      className="block w-full px-3 py-1 rounded bg-green-600 hover:bg-green-700 text-white text-sm font-semibold transition active:scale-95"
                    >
                      Mark as Claimed
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="block w-full px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition active:scale-95"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredItems.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            No items match your criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemTable;
