import React, { useState, useEffect } from "react";
import { FaSearch, FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { MdLibraryAdd } from "react-icons/md";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { fetchAddons, deleteAddon, updateAddon } from "../services/api";

const AddOnPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [addons, setAddons] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadAddons();
  }, []);

  const loadAddons = async () => {
    try {
      const result = await fetchAddons();
      if (result.success) {
        setAddons(result.addons);
      }
    } catch (error) {
      console.error('Error loading addons:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this add-on?")) {
      try {
        const result = await deleteAddon(id);
        if (result.success) {
          setAddons(addons.filter(addon => addon._id !== id));
        }
      } catch (error) {
        console.error('Error deleting addon:', error);
      }
    }
  };

  const toggleStatus = async (addon) => {
    const newStatus = addon.status === "Active" ? "Inactive" : "Active";
    try {
      const result = await updateAddon(addon._id, { ...addon, status: newStatus });
      if (result.success) {
        setAddons(addons.map(a => 
          a._id === addon._id ? { ...a, status: newStatus } : a
        ));
      }
    } catch (error) {
      console.error('Error updating addon status:', error);
    }
  };

  const filteredAddons = addons.filter((addon) =>
    addon.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    addon.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: addons.length,
    active: addons.filter(a => a.status === "Active").length,
    inactive: addons.filter(a => a.status === "Inactive").length
  };

  return (
    <div className="p-2 sm:p-6 bg-red-50 min-h-screen">
      {/* Stats Cards */}
      <div className="mb-4 sm:mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-500">Total Add-ons</p>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
                  {stats.total}
                </h3>
              </div>
              <div className="p-2 sm:p-3 bg-blue-100 rounded-full">
                <MdLibraryAdd className="text-lg sm:text-xl text-blue-500" />
              </div>
            </div>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-500">Active Add-ons</p>
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
                <p className="text-xs sm:text-sm text-gray-500">Inactive Add-ons</p>
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
            placeholder="Search add-ons..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 shadow rounded-lg focus:outline-none focus:border-red-500"
          />
          <FaSearch className="absolute left-3 top-3.5 text-gray-700" />
        </div>
        <button
          onClick={() => navigate("/dashboard/add-addon")}
          className="flex justify-center items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-lg hover:from-red-600 hover:to-red-700 transition-all shadow-md"
        >
          <FaPlus />
          <span>Add Add-on</span>
        </button>
      </div>

      {/* Add-ons Cards */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-700 text-lg">Available Add-ons ({filteredAddons.length})</h3>
        
        {loading ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-500">Loading addons...</p>
          </div>
        ) : (
          filteredAddons.map((addon) => (
            <div key={addon._id} className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <div className="font-medium text-gray-900 text-lg">{addon.name}</div>
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {addon.category}
                    </span>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      addon.status === "Active" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-red-100 text-red-800"
                    }`}>
                      {addon.status}
                    </span>
                  </div>
                  <div className="text-lg font-bold text-gray-900">₹{addon.price}</div>
                </div>
                
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => toggleStatus(addon)}
                    className={`flex items-center px-3 py-2 rounded-md text-sm transition-colors ${
                      addon.status === "Active"
                        ? "bg-red-50 text-red-600 hover:bg-red-100"
                        : "bg-green-50 text-green-600 hover:bg-green-100"
                    }`}
                  >
                    {addon.status === "Active" ? "Deactivate" : "Activate"}
                  </button>
                  <button
                    onClick={() => navigate("/dashboard/add-addon", { state: { addon } })}
                    className="flex items-center bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-2 rounded-md text-sm transition-colors"
                  >
                    <FaEdit className="mr-1" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(addon._id)}
                    className="flex items-center bg-red-50 text-red-600 hover:bg-red-100 px-3 py-2 rounded-md text-sm transition-colors"
                  >
                    <FaTrash className="mr-1" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
        
        {!loading && filteredAddons.length === 0 && (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <MdLibraryAdd className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No add-ons found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm ? 'Try adjusting your search terms.' : 'Get started by adding your first add-on.'}
            </p>
            {!searchTerm && (
              <div className="mt-6">
                <button
                  onClick={() => navigate('/dashboard/add-addon')}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                >
                  <FaPlus className="-ml-1 mr-2 h-4 w-4" />
                  Add Add-on
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddOnPage;