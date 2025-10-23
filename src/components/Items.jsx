import React, { useState, useEffect } from "react";
import { FaSearch, FaPlus, FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { BiSolidFoodMenu } from "react-icons/bi";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Items = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/item/get`);
      const data = await response.json();
      if (response.ok) {
        setItems(data.itemsdata || []);
      }
    } catch (error) {
      console.error('Error loading items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        const response = await fetch(`${API_BASE_URL}/api/item/delete/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          setItems(items.filter(item => item._id !== id));
          alert("Item deleted successfully!");
        } else {
          alert("Error deleting item");
        }
      } catch (error) {
        alert("Error deleting item");
      }
    }
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: items.length,
    available: items.filter(item => item.rating > 0).length,
    outOfStock: items.filter(item => item.rating === 0).length
  };

  if (loading) {
    return (
      <div className="p-6 bg-red-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading items...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-2 sm:p-6 bg-red-50 min-h-screen">
      {/* Stats Cards */}
      <div className="mb-4 sm:mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-500">Total Items</p>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
                  {stats.total}
                </h3>
              </div>
              <div className="p-2 sm:p-3 bg-blue-100 rounded-full">
                <BiSolidFoodMenu className="text-lg sm:text-xl text-blue-500" />
              </div>
            </div>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-500">Available Items</p>
                <h3 className="text-xl sm:text-2xl font-bold text-green-600">
                  {stats.available}
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
                <p className="text-xs sm:text-sm text-gray-500">Out of Stock</p>
                <h3 className="text-xl sm:text-2xl font-bold text-red-600">
                  {stats.outOfStock}
                </h3>
              </div>
              <div className="p-2 sm:p-3 bg-red-100 rounded-full">
                <FaTimesCircle className="text-lg sm:text-xl text-red-500" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Add Section */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search items..."
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
          <span>Add Item</span>
        </button>
      </div>

      {/* Items Cards */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-700 text-lg">Available Items ({filteredItems.length})</h3>
        
        {filteredItems.map((item) => (
          <div key={item._id} className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <img
                  className="h-16 w-16 rounded-lg object-cover"
                  src={item.image}
                  alt={item.name}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/64?text=' + item.name.charAt(0);
                  }}
                />
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium text-gray-900 text-lg">{item.name}</h4>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-400">⭐</span>
                    <span className="text-sm font-medium">{item.rating}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                    {item.category?.name || 'No Category'}
                  </span>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    item.veg ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {item.veg ? 'Veg' : 'Non-Veg'}
                  </span>
                  <span className="text-sm text-gray-600">{item.quantity}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="text-lg font-bold text-gray-900">₹{item.price}</div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/dashboard/add-item`, { state: { item } })}
                      className="flex items-center bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-2 rounded-md text-sm transition-colors"
                    >
                      <FaEdit className="mr-1" /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="flex items-center bg-red-50 text-red-600 hover:bg-red-100 px-3 py-2 rounded-md text-sm transition-colors"
                    >
                      <FaTrash className="mr-1" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {filteredItems.length === 0 && (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <BiSolidFoodMenu className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No items found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm ? 'Try adjusting your search terms.' : 'Get started by adding your first item.'}
            </p>
            {!searchTerm && (
              <div className="mt-6">
                <button
                  onClick={() => navigate('/dashboard/add-item')}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                >
                  <FaPlus className="-ml-1 mr-2 h-4 w-4" />
                  Add Item
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Items;