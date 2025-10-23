import React, { useState, useEffect } from "react";
import { FaSave, FaArrowLeft } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
  const [items, setItems] = useState([]);
  const [appliedItems, setAppliedItems] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const loadItems = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/item/get`);
        const data = await response.json();
        if (response.ok) {
          const itemsData = data.itemsdata || [];
          setItems(itemsData);
          
          // If editing, find items with this variation
          if (location.state?.variation) {
            const variation = location.state.variation;
            const itemsWithVariation = itemsData.filter(item => 
              item.variation && item.variation.some(v => v._id === variation._id)
            );
            setAppliedItems(itemsWithVariation);
          }
        }
      } catch (error) {
        console.error('Error loading items:', error);
      }
    };
    loadItems();

    if (location.state && location.state.variation) {
      const variation = location.state.variation;
      setFormData({
        name: variation.name || "",
        price: variation.price || "",
        item: variation.item || "",
        status: variation.available ? "Active" : "Inactive"
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

      let response;
      if (isEditing) {
        response = await fetch(`${API_BASE_URL}/api/variation/update/${editingId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            ...variationData, 
            itemId: variationData.item,
            available: variationData.status === "Active"
          }),
        });
      } else {
        const payload = {
          name: variationData.name,
          price: Number(variationData.price),
          stock: Number(variationData.stock || 0),
          itemId: variationData.item,
          available: variationData.status === "Active"
        };
        console.log('Sending variation data:', payload);
        response = await fetch(`${API_BASE_URL}/api/variation/add`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
      }
      
      if (response.ok) {
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
              Item *
            </label>
            <select
              id="item"
              name="item"
              value={formData.item}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
              required
            >
              <option value="">Select Item</option>
              {items.map(item => (
                <option key={item._id} value={item._id}>{item.name}</option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">
              Select which item this variation applies to
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

          {/* Applied Items Display */}
          {isEditing && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-700 mb-2">Currently Applied To:</h4>
              <div className="flex flex-wrap gap-2">
                {appliedItems.length > 0 ? (
                  appliedItems.map(item => (
                    <span key={item._id} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                      {item.name}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-gray-500">No items found with this variation</span>
                )}
              </div>
            </div>
          )}

          {/* Example Preview */}
          {formData.name && formData.item && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-700 mb-2">Preview:</h4>
              <div className="text-sm text-gray-600">
                <p><strong>Item:</strong> {items.find(i => i._id === formData.item)?.name || formData.item}</p>
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