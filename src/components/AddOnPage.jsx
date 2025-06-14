// src/components/Addons.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";

const Addons = () => {
  const navigate = useNavigate();
  const [addons, setAddons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [items, setItems] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch addons and items
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch addons
        const addonRes = await fetch(
          "https://hotelbuddhaavenue.vercel.app/api/user/addons"
        );
        const addonData = await addonRes.json();

        // Fetch items to map item names
        const itemRes = await fetch(
          "https://hotelbuddhaavenue.vercel.app/api/user/items"
        );
        const itemData = await itemRes.json();

        // Create item mapping
        const itemMap = {};
        if (itemData.success && itemData.itemsdata) {
          itemData.itemsdata.forEach((item) => {
            itemMap[item._id] = item.name;
          });
        }

        setItems(itemMap);
        setAddons(addonData.addons || []);
        setLoading(false);
      } catch (err) {
        setError("Failed to load data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this addon?")) return;

    try {
      const res = await fetch(
        `https://hotelbuddhaavenue.vercel.app/api/admin/deleteaddon/${id}`,
        { method: "DELETE" }
      );

      if (res.ok) {
        setAddons(addons.filter((addon) => addon._id !== id));
      } else {
        setError("Failed to delete addon");
      }
    } catch (err) {
      setError("Network error");
    }
  };

  if (loading) return <div className="text-center p-8">Loading...</div>;

  const filteredAddons = addons.filter(
    (addon) =>
      addon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (items[addon.itemId] || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );
  return (
    <div className="p-2 sm:p-6 bg-red-50">
      {/* Search and Add Section */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">
        {/* <h1 className="text-2xl font-bold text-gray-800">Meal Add-ons</h1> */}
        <div className="flex-1 relative">
          <input
            type="text"
            id="itemsSearch"
            name="itemsSearch"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 shadow rounded-lg focus:outline-none focus:border-red-500"
          />
          <FaSearch className="absolute left-3 top-3.5 text-gray-700" />
        </div>
        <button
          onClick={() => navigate("/dashboard/add-add-on")}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg hover:from-red-600 hover:to-red-700 transition-all"
        >
          <FaPlus />
          <span>Add New</span>
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded bg-red-100 text-red-700 text-center">
          {error}
        </div>
      )}

      {addons.length === 0 ? (
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No add-ons found. Add your first one!</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  #
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Item
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAddons.map((addon, index) => (
                <tr key={addon._id}>
                  <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{addon.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {items[addon.itemId] || "Unknown Item"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ₹{addon.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        addon.available
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {addon.available ? "In Stock" : "Out of Stock"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() =>
                        navigate("/dashboard/edit-addon", { state: { addon } })
                      }
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(addon._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Addons;
