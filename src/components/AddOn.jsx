// src/components/AddOn.jsx
import React, { useState, useEffect } from "react";
import { FaSave, FaArrowLeft, FaLeaf, FaCheck } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

const AddOn = () => {
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [isVeg, setIsVeg] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [items, setItems] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  // Fetch items for dropdown
  useEffect(() => {
    // Sample items - replace with your API call
    const sampleItems = [
      { _id: "1", name: "Butter Chicken" },
      { _id: "2", name: "Burger" },
      { _id: "3", name: "Mojito" },
    ];
    setItems(sampleItems);
  }, []);

  // Check if editing existing addon
  useEffect(() => {
    if (location.state && location.state.addon) {
      const { id, name, price, description, category, isVeg, isAvailable } =
        location.state.addon;
      setItemName(name || "");
      setPrice(price || "");
      setDescription(description || "");
      setCategory(category || "");
      setIsVeg(isVeg || false);
      setIsAvailable(isAvailable !== false);
      setIsEditing(true);
      setEditId(id);
    }
  }, [location]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const addonData = {
      name: itemName,
      price: Number(price),
      description,
      category,
      veg: isVeg,
      available: isAvailable,
    };

    console.log("Addon data:", addonData);
    // Here you would save the data to your backend

    // Navigate back or show success message
    navigate("/dashboard/addons");
  };

  return (
    <div className="p-2 sm:p-6 bg-red-50">
      <div className="mb-6 flex items-center">
        <button
          onClick={() => navigate("/dashboard/addons")}
          className="mr-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200"
        >
          <FaArrowLeft />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {isEditing ? "Edit Add-On" : "Create New Add-On"}
          </h1>
          <p className="text-gray-600 text-sm">
            {isEditing ? "Update add-on details" : "Add a new add-on item"}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
        <form onSubmit={handleSubmit}>
          {/* Two columns layout for desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left column */}
            <div>
              {/* Item Name */}
              <div className="mb-4">
                <label
                  htmlFor="itemName"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Item Name
                </label>
                <input
                  type="text"
                  id="itemName"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter add-on name"
                  required
                />
              </div>

              {/* Price */}
              <div className="mb-4">
                <label
                  htmlFor="price"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Price (₹)
                </label>
                <input
                  type="number"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter price"
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              {/* Category */}
              <div className="mb-4">
                <label
                  htmlFor="category"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Category
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                >
                  <option value="">Select a category</option>
                  <option value="toppings">Toppings</option>
                  <option value="sauces">Sauces</option>
                  <option value="extras">Extras</option>
                  <option value="sides">Sides</option>
                </select>
              </div>
            </div>

            {/* Right column */}
            <div>
              {/* Description */}
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter description"
                  rows="3"
                />
              </div>

              {/* Toggle switches */}
              <div className="space-y-4 mt-6">
                {/* Veg Toggle */}
                <div className="flex items-center gap-2 bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                  <FaLeaf className="text-green-500" />
                  <span className="text-gray-700">Vegetarian</span>
                  <div className="relative ml-auto w-10 align-middle select-none">
                    <input
                      type="checkbox"
                      id="isVeg"
                      checked={isVeg}
                      onChange={() => setIsVeg(!isVeg)}
                      className="absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                      style={{
                        transform: isVeg ? "translateX(100%)" : "translateX(0)",
                        backgroundColor: isVeg
                          ? "rgb(34, 197, 94)"
                          : "rgb(239, 68, 68)",
                        borderColor: isVeg
                          ? "rgb(34, 197, 100 )"
                          : "rgb(239, 68, 80)",
                        transition: "transform 0.3s ease-in-out",
                      }}
                    />
                    <label
                      htmlFor="isVeg"
                      className={`block overflow-hidden h-6 rounded-full cursor-pointer ${
                        isVeg ? "bg-green-100" : "bg-red-100"
                      }`}
                    ></label>
                  </div>
                </div>

                {/* Available Toggle */}
                <div className="flex items-center gap-2 bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                  <FaCheck className="text-blue-500" />
                  <span className="text-gray-700">Available</span>
                  <div className="relative ml-auto w-10 align-middle select-none">
                    <input
                      type="checkbox"
                      id="isAvailable"
                      checked={isAvailable}
                      onChange={() => setIsAvailable(!isAvailable)}
                      className="absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                      style={{
                        transform: isAvailable
                          ? "translateX(100%)"
                          : "translateX(0)",
                        backgroundColor: isAvailable
                          ? "rgb(34, 197, 94)"
                          : "rgb(239, 68, 68)",
                        borderColor: isAvailable
                          ? "rgb(34, 197, 100 )"
                          : "rgb(239, 68, 80)",
                        transition: "transform 0.3s ease-in-out",
                      }}
                    />
                    <label
                      htmlFor="isAvailable"
                      className={`block overflow-hidden h-6 rounded-full cursor-pointer ${
                        isAvailable ? "bg-green-100" : "bg-red-100"
                      }`}
                    ></label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Submit button */}
          <div className="flex justify-end mt-6 pt-4 border-t border-gray-100">
            <button
              type="submit"
              className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-lg hover:from-red-600 hover:to-red-700 transition-all shadow-sm"
            >
              <FaSave />
              <span>{isEditing ? "Update" : "Save"} Add-On</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddOn;
