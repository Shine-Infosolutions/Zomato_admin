// src/components/Items.jsx
import React, { useState } from "react";
import { FaSearch, FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { FaSitemap, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Items = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Sample data - replace with your actual data
  const items = [
    {
      id: 1,
      name: "Butter Chicken",
      category: "Muglai Chicken",
      price: 599,
      status: "Publish",
    },
    {
      id: 2,
      name: "Burger",
      category: "Fast Food",
      price: 29,
      status: "Publish",
    },
    {
      id: 3,
      name: "mojito",
      category: "Drink",
      price: 15,
      status: "Unpublish",
    },
  ];

  const handleDelete = (id) => {
    console.log("Deleting item with id:", id);
    alert(`Item with ID ${id} has been deleted`);
  };

  return (
    <div className="p-2 sm:p-6 bg-red-50">
      {/* Stats Cards */}
      {/* <div className="mb-4 sm:mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-500">Total Items</p>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
                  48
                </h3>
              </div>
              <div className="p-2 sm:p-3 bg-red-100 rounded-full">
                <FaSitemap className="text-lg sm:text-xl text-red-500" />
              </div>
            </div>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-500">
                  Published Items
                </p>
                <h3 className="text-xl sm:text-2xl font-bold text-green-600">
                  35
                </h3>
              </div>
              <div className="p-2 sm:p-3 bg-green-100 rounded-full">
                <FaCheckCircle className="text-lg sm:text-xl text-green-500" />
              </div>
            </div>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-500">
                  Unpublished Items
                </p>
                <h3 className="text-xl sm:text-2xl font-bold text-red-600">
                  13
                </h3>
              </div>
              <div className="p-2 sm:p-3 bg-red-100 rounded-full">
                <FaTimesCircle className="text-lg sm:text-xl text-red-500" />
              </div>
            </div>
          </div>
        </div>
      </div> */}

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
        {/* <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="flex-1 relative">
            <input
              type="text"
              id="itemSearch"
              name="itemSearch"
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 shadow rounded-lg focus:outline-none focus:border-red-500"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>

          <button
            onClick={() => navigate("/dashboard/add-item")}
            className="flex justify-center items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            <FaPlus />
            <span>Add Item</span>
          </button>
        </div> */}

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
                {/* <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium uppercase">
                  Status
                </th> */}
                <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {items.map((item) => (
                <tr key={item.id}>
                  <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
                    {item.id}
                  </td>
                  <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
                    {item.name}
                  </td>
                  <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
                    {item.category}
                  </td>
                  <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
                    ₹{item.price}
                  </td>
                  {/* <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
                    <span
                      className={`px-2 sm:px-4 py-1 sm:py-2 inline-flex text-xs leading-5 font-semibold rounded-md ${
                        item.status === "Publish"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td> */}
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
                      onClick={() => handleDelete(item.id)}
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
