import React, { useState, useEffect } from "react";
import { FaSave, FaArrowLeft, FaUpload, FaLeaf, FaDrumstickBite } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AddItem = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    longDescription: "",
    quantity: "",
    veg: true,
    rating: 4.0,
    image: null,
    variations: [],
    addons: []
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [categories, setCategories] = useState([]);
  const [availableVariations, setAvailableVariations] = useState([]);
  const [availableAddons, setAvailableAddons] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/category/get`);
        const data = await response.json();
        if (response.ok) {
          setCategories(data.categories || []);
        }
      } catch (error) {
        console.error('Error loading categories:', error);
      }
    };

    const loadVariations = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/variation/get`);
        const data = await response.json();
        if (response.ok) {
          setAvailableVariations(data.variations || []);
        }
      } catch (error) {
        console.error('Error loading variations:', error);
      }
    };

    const loadAddons = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/addon/get`);
        const data = await response.json();
        if (response.ok) {
          setAvailableAddons(data.addons || []);
        }
      } catch (error) {
        console.error('Error loading addons:', error);
      }
    };

    loadCategories();
    loadVariations();
    loadAddons();

    if (location.state && location.state.item) {
      const item = location.state.item;
      setFormData({
        name: item.name || "",
        category: item.category?._id || "",
        price: item.price || "",
        description: item.description || "",
        longDescription: item.longDescription || "",
        quantity: item.quantity || "",
        veg: item.veg || true,
        rating: item.rating || 4.0,
        image: null,
        variations: item.variation || [],
        addons: item.addon || []
      });
      setImagePreview(item.image);
      setIsEditing(true);
    }
  }, [location]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const itemData = {
        name: formData.name,
        category: formData.category,
        price: parseFloat(formData.price),
        description: formData.description,
        longDescription: formData.longDescription,
        quantity: formData.quantity,
        veg: formData.veg,
        rating: parseFloat(formData.rating),
        variation: formData.variations,
        addon: formData.addons
      };

      console.log(isEditing ? "Updating item:" : "Creating item:", itemData);
      
      let response;
      if (isEditing) {
        response = await fetch(`${API_BASE_URL}/api/item/update/${location.state.item._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(itemData),
        });
      } else {
        response = await fetch(`${API_BASE_URL}/api/item/add`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(itemData),
        });
      }
      
      if (response.ok) {
        alert(isEditing ? "Item updated successfully!" : "Item created successfully!");
        navigate("/dashboard/items");
      } else {
        alert("Error saving item. Please try again.");
      }
    } catch (error) {
      alert("Error saving item. Please try again.");
    }
  };

  return (
    <div className="p-2 sm:p-6 bg-red-50 min-h-screen">
      <div className="mb-6 flex items-center">
        <button
          onClick={() => navigate("/dashboard/items")}
          className="mr-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
        >
          <FaArrowLeft />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {isEditing ? "Update Item" : "Add New Item"}
          </h1>
          <p className="text-gray-600 text-sm">
            {isEditing ? "Edit item details" : "Create a new food item"}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4 sm:p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Item Image
            </label>
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-20 w-20 object-cover rounded-lg border"
                  />
                ) : (
                  <div className="h-20 w-20 bg-gray-200 rounded-lg flex items-center justify-center">
                    <FaUpload className="text-gray-400" />
                  </div>
                )}
              </div>
              <div>
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <label
                  htmlFor="image"
                  className="cursor-pointer bg-white border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Choose Image
                </label>
                <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</p>
              </div>
            </div>
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                Item Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                placeholder="Enter item name"
                required
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-gray-700 font-medium mb-2">
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                required
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat._id} value={cat._id}>{cat.category}</option>
                ))}
              </select>
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
            </div>

            <div>
              <label htmlFor="quantity" className="block text-gray-700 font-medium mb-2">
                Quantity/Serving Size
              </label>
              <input
                type="text"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                placeholder="e.g., 1 piece, 250g, 500ml"
              />
            </div>

            <div>
              <label htmlFor="rating" className="block text-gray-700 font-medium mb-2">
                Rating (1-5)
              </label>
              <input
                type="number"
                id="rating"
                name="rating"
                value={formData.rating}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                min="1"
                max="5"
                step="0.1"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Food Type
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="veg"
                    value={true}
                    checked={formData.veg === true}
                    onChange={() => setFormData(prev => ({ ...prev, veg: true }))}
                    className="mr-2"
                  />
                  <FaLeaf className="text-green-500 mr-1" />
                  <span>Vegetarian</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="veg"
                    value={false}
                    checked={formData.veg === false}
                    onChange={() => setFormData(prev => ({ ...prev, veg: false }))}
                    className="mr-2"
                  />
                  <FaDrumstickBite className="text-red-500 mr-1" />
                  <span>Non-Vegetarian</span>
                </label>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
              Short Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
              placeholder="Brief description of the item"
            />
          </div>

          {/* Variations */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Variations
            </label>
            <div className="space-y-2 max-h-40 overflow-y-auto border border-gray-300 rounded-lg p-3">
              {availableVariations.map(variation => (
                <label key={variation._id} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.variations.some(v => (typeof v === 'object' ? v._id : v) === variation._id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData(prev => ({
                          ...prev,
                          variations: [...prev.variations, variation._id]
                        }));
                      } else {
                        setFormData(prev => ({
                          ...prev,
                          variations: prev.variations.filter(v => (typeof v === 'object' ? v._id : v) !== variation._id)
                        }));
                      }
                    }}
                    className="mr-2"
                  />
                  <span className="text-sm">{variation.name} (+₹{variation.price})</span>
                </label>
              ))}
            </div>
          </div>

          {/* Add-ons */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Add-ons
            </label>
            <div className="space-y-2 max-h-40 overflow-y-auto border border-gray-300 rounded-lg p-3">
              {availableAddons.map(addon => (
                <label key={addon._id} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.addons.some(a => (typeof a === 'object' ? a._id : a) === addon._id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData(prev => ({
                          ...prev,
                          addons: [...prev.addons, addon._id]
                        }));
                      } else {
                        setFormData(prev => ({
                          ...prev,
                          addons: prev.addons.filter(a => (typeof a === 'object' ? a._id : a) !== addon._id)
                        }));
                      }
                    }}
                    className="mr-2"
                  />
                  <span className="text-sm">{addon.name} (+₹{addon.price})</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="longDescription" className="block text-gray-700 font-medium mb-2">
              Detailed Description
            </label>
            <textarea
              id="longDescription"
              name="longDescription"
              value={formData.longDescription}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
              placeholder="Detailed description including ingredients, preparation method, etc."
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-end pt-6">
            <button
              type="button"
              onClick={() => navigate("/dashboard/items")}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-lg hover:from-red-600 hover:to-red-700 transition-all shadow-md"
            >
              <FaSave />
              <span>{isEditing ? "Update" : "Save"} Item</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItem;