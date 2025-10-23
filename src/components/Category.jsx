// src/components/Category.jsx
import React, { useState, useEffect } from "react";
import { FaSearch, FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Category = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCategories = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/api/category/get`);
        const data = await response.json();
        if (response.ok) {
          console.log('Categories received:', data.categories);
          setCategories(data.categories || []);
        } else {
          console.error('Failed to fetch categories:', data.message);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
      setLoading(false);
    };
    loadCategories();
  }, []);
  // const handleDelete = (id) => {
  //   // Here you would delete the category from your data store
  //   console.log("Deleting category with id:", id);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        const response = await fetch(`${API_BASE_URL}/api/category/delete/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          setCategories(categories.filter(cat => cat._id !== id));
          alert('Category deleted successfully');
        } else {
          alert('Error deleting category');
        }
      } catch (error) {
        alert('Error deleting category');
      }
    }
  };

  return (
    <div className="p-2 sm:p-6 bg-red-50">
      {/* Stats Cards */}
      <div className="mb-4 sm:mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-500">
                  Total Categories
                </p>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
                  {categories.length}
                </h3>
              </div>
              <div className="p-2 sm:p-3 bg-red-100 rounded-full">
                <BiSolidCategory className="text-lg sm:text-xl text-red-500" />
              </div>
            </div>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-500">
                  Publish Categories
                </p>
                <h3 className="text-xl sm:text-2xl font-bold text-green-600">
                  {categories.length}
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
                  Unpublish Categories
                </p>
                <h3 className="text-xl sm:text-2xl font-bold text-red-600">
                  0
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
          onClick={() => navigate("/dashboard/add-category")}
          className="flex justify-center items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-lg hover:from-red-600 hover:to-red-700 transition-all shadow-md"
        >
          <FaPlus />
          <span>Add Category</span>
        </button>
      </div>
      {/* Categories Cards */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-700 text-lg">Available Categories</h3>
        
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading categories...</p>
          </div>
        ) : (
          categories.map((cat) => (
            <div key={cat._id} className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <div className="font-medium text-gray-900 text-lg">{cat.category || 'Unnamed Category'}</div>
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      Published
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">ID:</span> {cat.id || 'Auto-generated'}
                  </div>
                </div>
                
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() =>
                      navigate("/dashboard/add-category", {
                        state: { category: cat },
                      })
                    }
                    className="flex items-center bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-2 rounded-md text-sm transition-colors"
                  >
                    <FaEdit className="mr-1" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(cat._id)}
                    className="flex items-center bg-red-50 text-red-600 hover:bg-red-100 px-3 py-2 rounded-md text-sm transition-colors"
                  >
                    <FaTrash className="mr-1" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Category;
