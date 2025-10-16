import React, { useState, useEffect } from "react";
import { FaSave, FaArrowLeft } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { addVariation, updateVariation } from "../services/api";

const AddVariation = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    item: "",
    status: "Active"
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [items] = useState([
    { _id: "1", name: "Pizza" },
    { _id: "2", name: "Burger" },
    { _id: "3", name: "Sandwich" },
    { _id: "4", name: "Coffee" },
    { _id: "5", name: "Cake" }
  ]);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state && location.state.variation) {
      const variation = location.state.variation;
      setFormData({
        name: variation.name || "",
        price: variation.price || "",
        item: variation.item || "",
        status: variation.status || "Active"
      });
      setIsEditing(true);
      setEditingId(variation._id);
    }
  }, [location]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const variationData = {
        ...formData,
        price: parseFloat(formData.price) || 0
      };

      let result;
      if (isEditing) {
        result = await updateVariation(editingId, variationData);
      } else {
        result = await addVariation(variationData);
      }
      
      if (result.success) {
        alert(isEditing ? "Variation updated successfully!" : "Variation created successfully!");
        navigate("/dashboard/variation");
      } else {
        alert("Error saving variation. Please try again.");
      }
    } catch (error) {
      alert("Error saving variation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-2 sm:p-6 bg-red-50 min-h-screen">
      <div className="mb-6 flex items-center">
        <button
          onClick={() => navigate("/dashboard/variation")}
          className="mr-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
        >
          <FaArrowLeft />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {isEditing ? "Update Variation" : "Add New Variation"}
          </h1>
          <p className="text-gray-600 text-sm">
            {isEditing ? "Edit variation details" : "Create a new item variation"}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4 sm:p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Variation Name */}
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
              Variation Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
              placeholder="e.g., Small, Medium, Large, Regular, Jumbo"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Enter the variation name (e.g., size, portion, etc.)
            </p>
          </div>

          {/* Item Selection */}
          <div>
            <label htmlFor="item" className="block text-gray-700 font-medium mb-2">
              Item Category *
            </label>
            <select
              id="item"
              name="item"
              value={formData.item}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
              required
            >
              <option value="">Select Item Category</option>
              {items.map(item => (
                <option key={item._id} value={item.name}>{item.name}</option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">
              Select which item category this variation applies to
            </p>
          </div>

          {/* Additional Price */}
          <div>
            <label htmlFor="price" className="block text-gray-700 font-medium mb-2">
              Additional Price (₹)
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
              placeholder="0.00"
              min="0"
              step="0.01"
            />
            <p className="text-xs text-gray-500 mt-1">
              Additional cost for this variation. Enter 0 if no extra charge.
            </p>
          </div>

          {/* Status */}
          <div>
            <label htmlFor="status" className="block text-gray-700 font-medium mb-2">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">
              Set variation availability status
            </p>
          </div>

          {/* Example Preview */}
          {formData.name && formData.item && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-700 mb-2">Preview:</h4>
              <div className="text-sm text-gray-600">
                <p><strong>Item:</strong> {formData.item}</p>
                <p><strong>Variation:</strong> {formData.name}</p>
                <p><strong>Additional Cost:</strong> {formData.price ? `+₹${formData.price}` : "Free"}</p>
                <p><strong>Status:</strong> {formData.status}</p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 justify-end pt-6">
            <button
              type="button"
              onClick={() => navigate("/dashboard/variation")}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-lg hover:from-red-600 hover:to-red-700 transition-all shadow-md disabled:opacity-50"
            >
              <FaSave />
              <span>{loading ? 'Saving...' : (isEditing ? "Update" : "Save")} Variation</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVariation;