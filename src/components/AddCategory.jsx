// src/components/AddCategory.jsx
import React, { useState, useEffect } from "react";
import { FaSave } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryStatus, setCategoryStatus] = useState("Publish");
  const [categoryItem, setCategoryItem] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  // Check if we're editing an existing category
  useEffect(() => {
    if (location.state && location.state.category) {
      const { id, name, items, status } = location.state.category;
      setCategoryName(name);
      setCategoryItem(items);
      setCategoryStatus(status);
      setIsEditing(true);
      setEditId(id);
    }
  }, [location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic to save the category
    const categoryData = {
      id: isEditing ? editId : Date.now(), // Use existing ID when editing
      name: categoryName,
      items: categoryItem,
      status: categoryStatus,
    };

    if (isEditing) {
      console.log("Category updated:", categoryData);
      // Here you would update the category in your data store
    } else {
      console.log("Category added:", categoryData);
      // Here you would add the new category to your data store
    }

    // Navigate back to categories list
    navigate("/dashboard/category");
  };

  return (
    <div className="p-2 sm:p-6 px-2 sm:px-4 bg-red-50">
      <div className="mb-4 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
          {isEditing ? "Update Category" : "Add New Category"}
        </h2>
        <p className="text-sm sm:text-base text-gray-600 mt-2">
          {isEditing
            ? "Edit category details"
            : "Create a new category for your items"}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-3 sm:p-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="categoryName"
              className="block text-gray-700 font-medium mb-2"
            >
              Category Name
            </label>
            <input
              type="text"
              id="categoryName"
              name="categoryName"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="w-full px-3 sm:px-4 py-2 shadow rounded-lg focus:outline-none focus:border-red-500"
              placeholder="Enter category name"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="categoryItem"
              className="block text-gray-700 font-medium mb-2"
            >
              Item Id
            </label>
            <input
              type="number"
              id="categoryItem"
              name="categoryItem"
              value={categoryItem}
              onChange={(e) => setCategoryItem(e.target.value)}
              className="w-full px-3 sm:px-4 py-2 shadow rounded-lg focus:outline-none focus:border-red-500"
              placeholder="Enter item count"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="categoryStatus"
              className="block text-gray-700 font-medium mb-2"
            >
              Status
            </label>
            <select
              id="categoryStatus"
              name="categoryStatus"
              value={categoryStatus}
              onChange={(e) => setCategoryStatus(e.target.value)}
              className="w-full px-3 sm:px-4 py-2 shadow rounded-lg focus:outline-none focus:border-red-500"
            >
              <option value="Publish">Publish</option>
              <option value="Unpublish">Unpublish</option>
            </select>
          </div>

          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={() => navigate("/dashboard/category")}
              className="px-4 shadow sm:px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex shadow justify-center items-center gap-2 bg-red-500 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              <FaSave />
              <span>{isEditing ? "Update" : "Save"} Category</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
