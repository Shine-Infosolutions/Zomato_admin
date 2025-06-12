// src/components/Items.jsx
import React, { useState, useEffect } from "react";
import { FaSearch, FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { FaSitemap, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Items = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState({});
  const navigate = useNavigate();

  // Fetch categories from API
  useEffect(() => {
    fetch("https://hotelbuddhaavenue.vercel.app/api/user/category")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.categories)) {
          // Create a mapping of category IDs to names for easy lookup
          const categoryMap = {};
          data.categories.forEach((category) => {
            categoryMap[category.id] = category.name;
          });
          setCategories(categoryMap);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch categories:", err);
      });
  }, []);

  // Fetch items from API
  useEffect(() => {
    fetch("https://hotelbuddhaavenue.vercel.app/api/user/items")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.itemsdata)) {
          setItems(data.itemsdata);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch items:", err);
      });
  }, []);

  const handleDelete = async (_id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      const response = await fetch(
        "https://hotelbuddhaavenue.vercel.app/api/admin/deleteitem",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ itemId: _id }), // or { _id: id } if backend expects _id
        }
      );

      const result = await response.json();

      if (response.ok && result.success) {
        setItems((prev) => prev.filter((item) => item._id !== _id));
        alert(result.message || "Item deleted successfully!");
      } else {
        alert(result.message || "Failed to delete item.");
      }
    } catch (error) {
      alert("Error deleting item: " + error.message);
    }
  };

  // Get category name from categoryId
  const getCategoryName = (categoryId) => {
    return categories[categoryId] || categoryId || "-";
  };

  return (
    <div className="p-2 sm:p-6 bg-red-50">
      {/* Search and Add Section */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">
        <div className="flex-1 relative">
          <input
            type="text"
            id="variationSearch"
            name="variationSearch"
            placeholder="Search variations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 shadow rounded-lg focus:outline-none focus:border-red-500"
          />
          <FaSearch className="absolute left-3 top-3.5 text-gray-700" />
        </div>

        <button
          onClick={() => navigate("/dashboard/add-item")}
          className="flex justify-center items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-lg hover:from-red-600 hover:to-red-700 transition-all shadow-md"
        >
          <FaPlus />
          <span>Add Items</span>
        </button>
      </div>
      <div className="bg-white rounded-lg shadow p-4 sm:p-6">
        {/* Table Section */}
        <div className="overflow-x-auto">
          <div className="px-4 py-3 bg-gray-50">
            <h3 className="font-semibold text-gray-700">Available Items</h3>
          </div>
          <table className="min-w-full">
            <thead className="bg-gray-50 text-black-500">
              <tr>
                <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium uppercase">
                  ID
                </th>
                <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium uppercase">
                  Name
                </th>
                <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium uppercase">
                  Category
                </th>
                <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium uppercase">
                  Price
                </th>
                <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {items.map((item, index) => (
                <tr key={item.id}>
                  <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
                    {index + 1}
                  </td>
                  <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
                    {item.name}
                  </td>
                  <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
                    {getCategoryName(item.categoryId)}
                  </td>
                  <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
                    ₹{item.price}
                  </td>
                  <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-left text-sm font-medium">
                    <button
                      onClick={() =>
                        navigate("/dashboard/add-item", { state: { item } })
                      }
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
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
      </div>
    </div>
  );
};

export default Items;
