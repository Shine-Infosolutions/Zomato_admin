import React, { useState, useEffect } from "react";
import { FaSave, FaLeaf, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AiOutlineStock } from "react-icons/ai";

const AddMealAddon = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [itemId, setItemId] = useState("");
  const [addonName, setAddonName] = useState("");
  const [price, setPrice] = useState("");
  const [isVeg, setIsVeg] = useState(true);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isStock, setIsStock] = useState(false);
  const [itemStatus, setItemStatus] = useState("");

  // Fetch items for dropdown
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch(
          "https://hotelbuddhaavenue.vercel.app/api/user/items"
        );
        const data = await res.json();
        setItems(data.itemsdata || []);
      } catch {
        setError("Failed to fetch items");
      }
    };
    fetchItems();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    if (!itemId || !addonName || !price) {
      setError("Please fill all fields.");
      return;
    }

    const addonData = {
      name: addonName,
      price: Number(price),
      veg: isVeg,
      available: true,
      itemId, // You may need to send this if your backend expects it
    };

    try {
      const res = await fetch(
        "https://hotelbuddhaavenue.vercel.app/api/admin/addaddon",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(addonData),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setSuccess("Add-On added successfully!");
        setAddonName("");
        setPrice("");
        setIsVeg(true);
        setItemId("");
      } else {
        setError(data.message || "Failed to add Add-On.");
      }
    } catch {
      setError("Network error. Please try again.");
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <div className="mb-6 flex items-center">
        <button
          onClick={() => navigate("/dashboard")}
          className="mr-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200"
        >
          <FaArrowLeft />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Add Meal Add-On</h1>
          <p className="text-gray-600 text-sm">
            Here you can add add-ons to your meal items.
          </p>
        </div>
      </div>
      {success && (
        <div className="mb-4 p-3 rounded bg-green-100 text-green-700 text-center">
          {success}
        </div>
      )}
      {error && (
        <div className="mb-4 p-3 rounded bg-red-100 text-red-700 text-center">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        {/* Item Dropdown */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Item Name
          </label>
          <select
            value={itemId}
            onChange={(e) => setItemId(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          >
            <option value="">Select an item</option>
            {items.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        {/* Add-On Name */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Add-On Name
          </label>
          <input
            type="text"
            value={addonName}
            onChange={(e) => setAddonName(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="e.g. Oregano, Extra Cheese"
            required
          />
        </div>
        {/* Price */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Price (₹)
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Enter price"
            min="0"
            required
          />
        </div>
        {/* Veg/Non-Veg Toggle */}
        <div className="mb-4">
          <div className="flex items-center gap-2 bg-white p-2 rounded-lg shadow">
            <AiOutlineStock className="text-blue-500" />
            <span className="text-sm">Is Stock?</span>
            <div className="relative ml-auto w-10 align-middle select-none">
              <input
                type="checkbox"
                id="toggleStock"
                checked={isStock}
                onChange={() => setIsStock(!isStock)}
                className="absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                style={{
                  transform: isStock ? "translateX(100%)" : "translateX(0)",
                  backgroundColor: isStock
                    ? "rgb(34, 197, 94)"
                    : "rgb(239, 68, 68)",
                  borderColor: isStock
                    ? "rgb(34, 197, 100 )"
                    : "rgb(239, 68, 80)",
                  transition: "transform 0.3s ease-in-out",
                }}
              />
              <label
                htmlFor="toggleStock"
                className={`block overflow-hidden h-6 rounded-full cursor-pointer ${
                  isStock ? "bg-green-100" : "bg-red-100"
                }`}
              ></label>
            </div>
          </div>
        </div>
        <div className="mb-4">
          {/* <label
            htmlFor="itemStatus"
            className="block text-gray-700 font-medium mb-2"
          >
            Status
          </label> */}
          <div className="flex-1">
            <select
              id="itemStatus"
              value={itemStatus}
              onChange={(e) => setItemStatus(e.target.value)}
              className="w-full px-3 py-2 shadow rounded-lg focus:outline-none focus:border-red-500"
              required
            >
              <option value="Publish">Select a Status</option>
              <option value="Publish">Publish</option>
              <option value="Unpublish">Unpublish</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-lg hover:from-red-600 hover:to-red-700 transition-all shadow-sm"
          >
            <FaSave />
            <span>Add add-on</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMealAddon;
