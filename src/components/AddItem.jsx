// src/components/AddItem.jsx
import React, { useState, useEffect } from "react";
import { FaSave, FaUpload } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { FaLeaf, FaWrench, FaStar, FaArrowLeft } from "react-icons/fa";
import { AiOutlineStock } from "react-icons/ai";

const AddItem = () => {
  const [itemName, setItemName] = useState("");
  const [itemCategory, setItemCategory] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState("");
  const [gst, setGst] = useState("");
  const [itemStatus, setItemStatus] = useState("Publish");
  const [addonCategory, setAddonCategory] = useState("");
  const [itemImage, setItemImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [isVeg, setIsVeg] = useState(false);
  // const [hasEggs, setHasEggs] = useState(false);
  // const [isRecommended, setIsRecommended] = useState(false);
  // const [hasVariation, setHasVariation] = useState(false);
  // const [hasTimeCustomization, setHasTimeCustomization] = useState(false);
  const [isStock, setIsStock] = useState(false);
  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [rating, setRating] = useState(0);

  const [categoryOptions, setCategoryOptions] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  // Check if we're editing an existing item
  useEffect(() => {
    if (location.state && location.state.item) {
      const { id, name, category, price } = location.state.item;
      setItemName(name);
      setItemCategory(category);
      setBasePrice(price);
      setIsEditing(true);
      setEditId(id);
    }
  }, [location]);

  useEffect(() => {
    fetch("https://hotelbuddhaavenue.vercel.app/api/user/category")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.categories)) {
          setCategoryOptions(data.categories);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch categories:", err);
      });
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setItemImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  // Add this function to handle star clicks
  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const itemData = {
      id: isEditing ? editId : Date.now(),
      name: itemName,
      category: Number(itemCategory),
      price: parseFloat(basePrice),
      discountedPrice: parseFloat(discountedPrice) || parseFloat(basePrice),
      gst: parseFloat(gst),
      status: itemStatus,
      addonCategory: addonCategory,
      // In a real app, you'd upload the image to a server and store the URL
      image: itemImage ? itemImage.name : null,
      isVeg,
      isStock,
      shortDescription,
      longDescription,
      rating: rating,
      // hasEggs,
      // isRecommended,
      // hasVariation,
      // hasTimeCustomization,
    };

    try {
      const response = await fetch(
        "https://hotelbuddhaavenue.vercel.app/api/admin/additem",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(itemData),
        }
      );

      const result = await response.json();

      if (response.ok) {
        alert(result.message || "Item added successfully!");
        navigate("/dashboard/items");
      } else {
        alert(result.message || "Failed to add item.");
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="p-2 sm:p-6 px-2 sm:px-4 bg-red-50">
      <div className="mb-6 flex items-center">
        <button
          onClick={() => navigate("/dashboard/items")}
          className="mr-4  mb-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200"
        >
          <FaArrowLeft />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {isEditing ? "Update Items" : "Add New Items"}
          </h1>
          <p className="text-gray-600 text-sm">
            {isEditing ? "Edit Items details" : "Create a new items"}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-3 sm:p-6">
        <form onSubmit={handleSubmit}>
          {/* Row 1 */}
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <label
                htmlFor="itemName"
                className="block text-gray-700 font-medium mb-2"
              >
                Menu Item Name
              </label>
              <input
                type="text"
                id="itemName"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                className="w-full px-3 py-2 shadow rounded-lg focus:outline-none focus:border-red-500"
                placeholder="Enter menu item name"
                required
              />
            </div>

            <div className="flex-1">
              <label
                htmlFor="itemCategory"
                className="block text-gray-700 font-medium mb-2"
              >
                Menu Category
              </label>
              <select
                id="itemCategory"
                value={itemCategory}
                onChange={(e) => setItemCategory(e.target.value)}
                className="w-full px-3 py-2 shadow rounded-lg focus:outline-none focus:border-red-500"
                required
              >
                <option value="">Select a category</option>
                {categoryOptions.map((category) => (
                  <option key={category._id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* <div className="flex-1">
              <label
                htmlFor="addonCategory"
                className="block text-gray-700 font-medium mb-2"
              >
                Add Category
              </label>
              <select
                id="addonCategory"
                value={addonCategory}
                onChange={(e) => setAddonCategory(e.target.value)}
                className="w-full px-3 py-2 shadow rounded-lg focus:outline-none focus:border-red-500"
              >
                <option value="">None</option>
                <option value="Toppings">Toppings</option>
                <option value="Sauces">Sauces</option>
                <option value="Sides">Sides</option>
              </select>
            </div> */}
          </div>

          {/* Row 2 */}
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <label
                htmlFor="basePrice"
                className="block text-gray-700 font-medium mb-2"
              >
                Base Price (₹)
              </label>
              <input
                type="number"
                id="basePrice"
                value={basePrice}
                onChange={(e) => setBasePrice(e.target.value)}
                className="w-full px-3 py-2 shadow rounded-lg focus:outline-none focus:border-red-500"
                placeholder="Enter base price"
                min="0"
                step="0.01"
                required
              />
            </div>

            {/* <div className="flex-1">
              <label
                htmlFor="discountedPrice"
                className="block text-gray-700 font-medium mb-2"
              >
                Discounted Price (₹)
              </label>
              <input
                type="number"
                id="discountedPrice"
                value={discountedPrice}
                onChange={(e) => setDiscountedPrice(e.target.value)}
                className="w-full px-3 py-2 shadow rounded-lg focus:outline-none focus:border-red-500"
                placeholder="Enter discounted price"
                min="0"
                step="0.01"
              />
            </div> */}

            <div className="flex-1">
              <label
                htmlFor="gst"
                className="block text-gray-700 font-medium mb-2"
              >
                GST (%)
              </label>
              <input
                type="number"
                id="gst"
                value={gst}
                onChange={(e) => setGst(e.target.value)}
                className="w-full px-3 py-2 shadow rounded-lg focus:outline-none focus:border-red-500"
                placeholder="Enter GST percentage"
                min="0"
                max="100"
                step="0.01"
              />
            </div>
          </div>

          {/* Row 3 */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <label
                htmlFor="itemStatus"
                className="block text-gray-700 font-medium mb-2"
              >
                Menu Item Status
              </label>
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

            <div className="flex-2 md:flex-1">
              <label
                htmlFor="itemImage"
                className="block text-gray-700 font-medium mb-2"
              >
                Menu Item Image (500*500) pixels
              </label>
              <div className="flex-full items-center">
                <input
                  type="file"
                  id="itemImage"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <label
                  htmlFor="itemImage"
                  className="cursor-pointer flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <FaUpload />
                  <span>Choose Image</span>
                </label>
                {imagePreview && (
                  <div className="ml-4 h-12 w-12 rounded-md overflow-hidden">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
              </div>
              {/* <p className="text-xs text-gray-500 mt-1">
                Recommended size: 500*500 pixels
              </p> */}
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <label
                htmlFor="basePrice"
                className="block text-gray-700 font-medium mb-2"
              >
                Short Description
              </label>
              <input
                type="text"
                id="shortDescription"
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                className="w-full px-3 py-2 shadow rounded-lg focus:outline-none focus:border-red-500"
                placeholder="Enter your short description"
                min="0"
                step="0.01"
                required
              />
            </div>

            {/* <div className="flex-1">
              <label
                htmlFor="discountedPrice"
                className="block text-gray-700 font-medium mb-2"
              >
                Discounted Price (₹)
              </label>
              <input
                type="number"
                id="discountedPrice"
                value={discountedPrice}
                onChange={(e) => setDiscountedPrice(e.target.value)}
                className="w-full px-3 py-2 shadow rounded-lg focus:outline-none focus:border-red-500"
                placeholder="Enter discounted price"
                min="0"
                step="0.01"
              />
            </div> */}

            <div className="flex-1">
              <label
                htmlFor="basePrice"
                className="block text-gray-700 font-medium mb-2"
              >
                Long Description
              </label>
              <textarea
                type="text"
                id="longDescription"
                value={longDescription}
                onChange={(e) => setLongDescription(e.target.value)}
                className="w-full px-3 py-2 shadow rounded-lg focus:outline-none focus:border-red-500"
                placeholder="Enter your Long description"
                min="0"
                step="0.01"
                required
              />
            </div>
          </div>
          {/* Toggle Switches Row */}

          {/* <label className="block text-gray-700 font-medium mb-2">
              Item Attributes
            </label> */}
          <div className="mb-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {/* Veg Toggle */}
              <div className="flex items-center gap-2 bg-white p-2 rounded-lg shadow">
                <FaLeaf className="text-green-500" />
                <span className="text-sm">Is Veg?</span>
                <div className="relative ml-auto w-10 align-middle select-none">
                  <input
                    type="checkbox"
                    id="toggleVeg"
                    checked={isVeg}
                    onChange={() => setIsVeg(!isVeg)}
                    className="absolute block w-6 h-6 rounded-full  border-4 appearance-none cursor-pointer"
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
                    htmlFor="toggleVeg"
                    className={`block overflow-hidden h-6 rounded-full cursor-pointer ${
                      isVeg ? "bg-green-100" : "bg-red-100"
                    }`}
                  ></label>
                </div>
              </div>

              {/* Stock Toggle */}
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
              {/* Rating Stars */}
              <div className=" gap-2">
                <div className="flex-1">
                  <label className="block text-gray-700 font-medium mb-2">
                    Item Rating
                  </label>
                  <input
                    type="number"
                    id="rating"
                    value={rating} // Change from gst to rating
                    onChange={(e) => setRating(parseFloat(e.target.value))} // Parse as float
                    className="w-full px-3 py-2 shadow rounded-lg focus:outline-none focus:border-red-500"
                    placeholder="Out of 5"
                    min="0"
                    max="5"
                    step="0.1" // Allow decimal increments of 0.1
                  />
                </div>
              </div>
            </div>

            {/* Eggs Toggle */}
            {/* <div className="flex items-center gap-2 bg-white p-2 rounded-lg shadow">
                <FaEgg className="text-yellow-500" />
                <span className="text-sm">Is Eggs ?</span>
                <div className="relative ml-auto w-10 align-middle select-none">
                  <input
                    type="checkbox"
                    id="toggleEggs"
                    checked={hasEggs}
                    onChange={() => setHasEggs(!hasEggs)}
                    className="absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                    style={{
                      transform: hasEggs ? "translateX(100%)" : "translateX(0)",
                      backgroundColor: hasEggs
                        ? "rgb(34, 197, 94)"
                        : "rgb(239, 68, 68)",
                      borderColor: hasEggs
                        ? "rgb(34, 197, 100 )"
                        : "rgb(239, 68, 80)",
                      transition: "transform 0.3s ease-in-out",
                    }}
                  />
                  <label
                    htmlFor="toggleEggs"
                    className={`block overflow-hidden h-6 rounded-full cursor-pointer ${
                      hasEggs ? "bg-green-100" : "bg-red-100"
                    }`}
                  ></label>
                </div>
              </div> */}

            {/* Recommended Toggle */}
            {/* <div className="flex items-center gap-2 bg-white p-2 rounded-lg shadow">
                <FaStar className="text-amber-500" />
                <span className="text-sm">is Recommended ?</span>
                <div className="relative ml-auto w-10 align-middle select-none">
                  <input
                    type="checkbox"
                    id="toggleRecommended"
                    checked={isRecommended}
                    onChange={() => setIsRecommended(!isRecommended)}
                    className="absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                    style={{
                      transform: isRecommended
                        ? "translateX(100%)"
                        : "translateX(0)",
                      backgroundColor: isRecommended
                        ? "rgb(34, 197, 94)"
                        : "rgb(239, 68, 68)",
                      borderColor: isRecommended
                        ? "rgb(34, 197, 100 )"
                        : "rgb(239, 68, 80)",
                      transition: "transform 0.3s ease-in-out",
                    }}
                  />
                  <label
                    htmlFor="toggleRecommended"
                    className={`block overflow-hidden h-6 rounded-full cursor-pointer ${
                      isRecommended ? "bg-green-100" : "bg-red-100"
                    }`}
                  ></label>
                </div>
              </div> */}

            {/* Variation Toggle */}
            {/* <div className="flex items-center gap-2 bg-white p-2 rounded-lg shadow">
                <FaRandom className="text-purple-500" />
                <span className="text-sm">Is Variation ?</span>
                <div className="relative ml-auto w-10 align-middle select-none">
                  <input
                    type="checkbox"
                    id="toggleVariation"
                    checked={hasVariation}
                    onChange={() => setHasVariation(!hasVariation)}
                    className="absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                    style={{
                      transform: hasVariation
                        ? "translateX(100%)"
                        : "translateX(0)",
                      backgroundColor: hasVariation
                        ? "rgb(34, 197, 94)"
                        : "rgb(239, 68, 68)",
                      borderColor: hasVariation
                        ? "rgb(34, 197, 100 )"
                        : "rgb(239, 68, 80)",
                      transition: "transform 0.3s ease-in-out",
                    }}
                  />
                  <label
                    htmlFor="toggleVariation"
                    className={`block overflow-hidden h-6 rounded-full cursor-pointer ${
                      hasVariation ? "bg-green-100" : "bg-red-100"
                    }`}
                  ></label>
                </div>
              </div> */}

            {/* Time Customization Toggle */}
            {/* <div className="flex items-center gap-2 bg-white p-2 rounded-lg shadow">
                <FaClock className="text-blue-400" />
                <span className="text-sm">Time Customization</span>
                <div className="relative ml-auto w-10 align-middle select-none">
                  <input
                    type="checkbox"
                    id="toggleTimeCustomization"
                    checked={hasTimeCustomization}
                    onChange={() =>
                      setHasTimeCustomization(!hasTimeCustomization)
                    }
                    className="absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                    style={{
                      transform: hasTimeCustomization
                        ? "translateX(100%)"
                        : "translateX(0)",
                      backgroundColor: hasTimeCustomization
                        ? "rgb(34, 197, 94)"
                        : "rgb(239, 68, 68)",
                      borderColor: hasTimeCustomization
                        ? "rgb(34, 197, 100 )"
                        : "rgb(239, 68, 80)",
                      transition: "transform 0.3s ease-in-out",
                    }}
                  />
                  <label
                    htmlFor="toggleTimeCustomization"
                    className={`block overflow-hidden h-6 rounded-full cursor-pointer ${
                      hasTimeCustomization ? "bg-green-100" : "bg-red-100"
                    }`}
                  ></label>
                </div>
              </div> */}
          </div>

          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={() => navigate("/dashboard/items")}
              className="px-4 sm:px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex justify-center items-center gap-2 bg-red-500 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              <FaSave />
              <span>{isEditing ? "Update" : "Save"} Menu Item</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItem;
