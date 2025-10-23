import React, { useState, useEffect } from "react";
import { FaSave, FaArrowLeft } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AddOn = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    status: "Active"
  });
  const [isEditing, setIsEditing] = useState(false);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/item/get`);
      const data = await response.json();
      console.log('Items result:', data);
      if (response.ok) {
        setItems(data.itemsdata || []);
      } else {
        console.error('Failed to load items:', data.message);
      }
    } catch (error) {
      console.error('Error loading items:', error);
    }
  };

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state && location.state.addon) {
      const addon = location.state.addon;
      setFormData({
        name: addon.name || "",
        price: addon.price || "",
        category: addon.category || "",
        description: addon.description || "",
        status: addon.status || "Active"
      });
      setIsEditing(true);
      setEditingId(addon._id);
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
      const addonData = {
        ...formData,
        price: parseFloat(formData.price) || 0
      };

      let response;
      if (isEditing) {
        response = await fetch(`${API_BASE_URL}/api/addon/update/${editingId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(addonData),
        });
      } else {
        response = await fetch(`${API_BASE_URL}/api/addon/add`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(addonData),
        });
      }
      
      if (response.ok) {
        alert(isEditing ? "Add-on updated successfully!" : "Add-on created successfully!");
        navigate("/dashboard/add-on");
      } else {
        alert("Error saving add-on. Please try again.");
      }
    } catch (error) {
      alert("Error saving add-on. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-2 sm:p-6 bg-red-50 min-h-screen">
      <div className="mb-6 flex items-center">
        <button
          onClick={() => navigate("/dashboard/add-on")}
          className="mr-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
        >
          <FaArrowLeft />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {isEditing ? "Update Add-on" : "Add New Add-on"}
          </h1>
          <p className="text-gray-600 text-sm">
            {isEditing ? "Edit add-on details" : "Create a new add-on item"}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4 sm:p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Add-on Name */}
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
              Add-on Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
              placeholder="e.g., Extra Cheese, French Fries, Cold Drink"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Enter the add-on name that customers will see
            </p>
          </div>

          {/* Category and Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="category" className="block text-gray-700 font-medium mb-2">
                Item *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                required
              >
                <option value="">Select Item</option>
                {items.length > 0 ? (
                  items.map(item => (
                    <option key={item._id} value={item.name}>{item.name}</option>
                  ))
                ) : (
                  <option disabled>Loading items...</option>
                )}
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Select which item this add-on belongs to
              </p>
            </div>

            <div>
              <label htmlFor="price" className="block text-gray-700 font-medium mb-2">
                Price (₹) *
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
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Set the price for this add-on
              </p>
            </div>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
              placeholder="Brief description of the add-on (optional)"
            />
            <p className="text-xs text-gray-500 mt-1">
              Optional description to help customers understand the add-on
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
              Set add-on availability status
            </p>
          </div>

          {/* Example Preview */}
          {formData.name && formData.category && formData.price && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-700 mb-2">Preview:</h4>
              <div className="text-sm text-gray-600">
                <p><strong>Add-on:</strong> {formData.name}</p>
                <p><strong>Category:</strong> {formData.category}</p>
                <p><strong>Price:</strong> ₹{formData.price}</p>
                {formData.description && <p><strong>Description:</strong> {formData.description}</p>}
                <p><strong>Status:</strong> {formData.status}</p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 justify-end pt-6">
            <button
              type="button"
              onClick={() => navigate("/dashboard/add-on")}
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
              <span>{loading ? 'Saving...' : (isEditing ? "Update" : "Save")} Add-on</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddOn;