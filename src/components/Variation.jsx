import React, { useState, useEffect } from "react";
import { FaSearch, FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { LuSplit } from "react-icons/lu";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Variation = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [variations, setVariations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadVariations();
  }, []);

  const loadVariations = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/variation/get`);
      const data = await response.json();
      if (response.ok) {
        setVariations(data.variations || []);
      }
    } catch (error) {
      console.error('Error loading variations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this variation?")) {
      try {
        const response = await fetch(`${API_BASE_URL}/api/variation/delete/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          setVariations(variations.filter(variation => variation._id !== id));
        }
      } catch (error) {
        console.error('Error deleting variation:', error);
      }
    }
  };

  const toggleStatus = async (variation) => {
    const newAvailable = !variation.available;
    try {
      const response = await fetch(`${API_BASE_URL}/api/variation/update/${variation._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          name: variation.name,
          price: variation.price,
          stock: variation.stock || 0,
          available: newAvailable 
        }),
      });
      if (response.ok) {
        setVariations(variations.map(v => 
          v._id === variation._id ? { ...v, available: newAvailable } : v
        ));
      }
    } catch (error) {
      console.error('Error updating variation status:', error);
    }
  };

  const filteredVariations = variations.filter((variation) =>
    variation.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    variation.item?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: variations.length,
    active: variations.filter(v => v.available === true).length,
    inactive: variations.filter(v => v.available === false).length
  };

  return (
    <div className="p-2 sm:p-6 bg-red-50 min-h-screen">
      {/* Stats Cards */}
      <div className="mb-4 sm:mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-500">Total Variations</p>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
                  {stats.total}
                </h3>
              </div>
              <div className="p-2 sm:p-3 bg-blue-100 rounded-full">
                <LuSplit className="text-lg sm:text-xl text-blue-500" />
              </div>
            </div>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-500">Active Variations</p>
                <h3 className="text-xl sm:text-2xl font-bold text-green-600">
                  {stats.active}
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
                <p className="text-xs sm:text-sm text-gray-500">Inactive Variations</p>
                <h3 className="text-xl sm:text-2xl font-bold text-red-600">
                  {stats.inactive}
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
            placeholder="Search variations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 shadow rounded-lg focus:outline-none focus:border-red-500"
          />
          <FaSearch className="absolute left-3 top-3.5 text-gray-700" />
        </div>
        <button
          onClick={() => navigate("/dashboard/add-variation")}
          className="flex justify-center items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-lg hover:from-red-600 hover:to-red-700 transition-all shadow-md"
        >
          <FaPlus />
          <span>Add Variation</span>
        </button>
      </div>

      {/* Variations Cards */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-700 text-lg">Available Variations ({filteredVariations.length})</h3>
        
        {loading ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-500">Loading variations...</p>
          </div>
        ) : (
          filteredVariations.map((variation) => (
            <div key={variation._id} className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <div className="font-medium text-gray-900 text-lg">{variation.name}</div>
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {variation.item}
                    </span>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      variation.available 
                        ? "bg-green-100 text-green-800" 
                        : "bg-red-100 text-red-800"
                    }`}>
                      {variation.available ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Additional Price:</span> {variation.price === 0 ? "Free" : `+₹${variation.price}`}
                  </div>
                </div>
                
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => toggleStatus(variation)}
                    className={`flex items-center px-3 py-2 rounded-md text-sm transition-colors ${
                      variation.available
                        ? "bg-red-50 text-red-600 hover:bg-red-100"
                        : "bg-green-50 text-green-600 hover:bg-green-100"
                    }`}
                  >
                    {variation.available ? "Deactivate" : "Activate"}
                  </button>
                  <button
                    onClick={() => navigate("/dashboard/add-variation", { state: { variation } })}
                    className="flex items-center bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-2 rounded-md text-sm transition-colors"
                  >
                    <FaEdit className="mr-1" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(variation._id)}
                    className="flex items-center bg-red-50 text-red-600 hover:bg-red-100 px-3 py-2 rounded-md text-sm transition-colors"
                  >
                    <FaTrash className="mr-1" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
        
        {!loading && filteredVariations.length === 0 && (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <LuSplit className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No variations found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm ? 'Try adjusting your search terms.' : 'Get started by adding your first variation.'}
            </p>
            {!searchTerm && (
              <div className="mt-6">
                <button
                  onClick={() => navigate('/dashboard/add-variation')}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                >
                  <FaPlus className="-ml-1 mr-2 h-4 w-4" />
                  Add Variation
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Variation;