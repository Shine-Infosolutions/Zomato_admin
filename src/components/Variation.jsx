// src/components/Variation.jsx
import React, { useState, useEffect } from "react";
import {
  FaSearch,
  FaPlus,
  FaEdit,
  FaTrash,
  FaLayerGroup,
  FaFilter,
} from "react-icons/fa";
import { GrCubes } from "react-icons/gr";
import { LuSplit } from "react-icons/lu";
import { MdOutlineColorLens, MdOutlineLocalDrink } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Variation = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [message, setMessage] = useState(""); // <-- Add this line
  const [error, setError] = useState(""); // <-- If not already present

  // Sample data - replace with your actual data
  // First, update the sample data to include prices
  // const variations = [
  //   {
  //     id: 1,
  //     name: "Size",
  //     itemName: "Pizza",
  //     options: [
  //       { name: "Small", price: 199 },
  //       { name: "Medium", price: 299 },
  //       { name: "Large", price: 399 },
  //     ],
  //     status: "Publish",
  //     icon: <FaLayerGroup className="text-amber-500" />,
  //   },
  //   // {
  //   //   id: 2,
  //   //   name: "Spice Level",
  //   //   itemName: "Curry",
  //   //   options: [
  //   //     { name: "Mild", price: 0 },
  //   //     { name: "Medium", price: 0 },
  //   //     { name: "Hot", price: 20 },
  //   //     { name: "Extra Hot", price: 30 },
  //   //   ],
  //   //   status: "Publish",
  //   //   icon: <FaFilter className="text-red-500" />,
  //   // },
  //   {
  //     id: 3,
  //     name: "Toppings",
  //     itemName: "Ice Cream",
  //     options: [
  //       { name: "Chocolate", price: 25 },
  //       { name: "Sprinkles", price: 15 },
  //       { name: "Nuts", price: 30 },
  //       { name: "Caramel", price: 20 },
  //       { name: "Fruits", price: 35 },
  //       { name: "Whipped Cream", price: 25 },
  //     ],
  //     status: "Unpublish",
  //     icon: <MdOutlineColorLens className="text-purple-500" />,
  //   },
  //   // {
  //   //   id: 4,
  //   //   name: "Temperature",
  //   //   itemName: "Coffee",
  //   //   options: [
  //   //     { name: "Hot", price: 0 },
  //   //     { name: "Warm", price: 0 },
  //   //     { name: "Iced", price: 20 },
  //   //   ],
  //   //   status: "Publish",
  //   //   icon: <MdOutlineLocalDrink className="text-blue-500" />,
  //   // },
  //   {
  //     id: 5,
  //     name: "Sweetness",
  //     itemName: "Desert",
  //     options: [
  //       { name: "No Sugar", price: 0 },
  //       { name: "Less Sugar", price: 0 },
  //       { name: "Normal", price: 0 },
  //       { name: "Extra Sweet", price: 10 },
  //     ],
  //     status: "Publish",
  //     icon: <GrCubes className="text-yellow-500" />,
  //   },
  // ];

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

  // Optional: handle delete for a variation (UI only, not backend)
  const handleDeleteVariation = (itemId, variationId) => {
    setItems((prev) =>
      prev.map((item) =>
        item._id === itemId
          ? {
              ...item,
              variation: item.variation.filter((v) => v._id !== variationId),
            }
          : item
      )
    );
    setMessage(
      "Variation deleted from UI (implement backend delete if needed)"
    );
  };

  const filteredItems = items
    .filter(
      (item) => Array.isArray(item.variation) && item.variation.length > 0
    )
    .filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  // ...existing code...

  return (
    <div className="p-2 sm:p-6 bg-red-50">
      {/* <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Variation Management
        </h1>
        <p className="text-gray-600">
          Manage your product variations and options
        </p>
      </div> */}

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
          onClick={() => navigate("/dashboard/add-variation")}
          className="flex justify-center items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-lg hover:from-red-600 hover:to-red-700 transition-all shadow-md"
        >
          <FaPlus />
          <span>Add Variation</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredItems.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center p-4 border-b border-gray-200">
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-800">{item.name}</h3>
                {/* <p className="text-sm text-gray-500">
                  Applied to: {variation.itemName}
                </p> */}
              </div>
              {/* <span
                className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  variation.status === "Publish"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {variation.status}
              </span> */}
            </div>

            <div className="p-4">
              <div className="mb-3">
                <h4 className="text-sm font-medium text-gray-500 mb-2">
                  Options:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {item.variation && item.variation.length > 0 ? (
                    item.variation.map((v) => (
                      <div
                        key={v._id}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs flex items-center mb-2"
                        style={{
                          minWidth: 180,
                          justifyContent: "space-between",
                        }}
                      >
                        <span>
                          {v.name} - ₹{v.price} (Stock: {v.stock})
                        </span>
                        <button
                          className="ml-2"
                          onClick={() => handleDeleteVariation(item._id, v._id)}
                          title="Delete Variation"
                        >
                          <FaTrash color="red" />
                        </button>
                      </div>
                    ))
                  ) : (
                    <span className="text-gray-400">No variations</span>
                  )}
                </div>
              </div>

              {/* <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-200">
                <span className=" text-gray-500">ID: {item.id}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      navigate("/dashboard/add-variation", {
                        state: {
                          variation: {
                            id: item.id,
                            name: item.name,
                            // itemName: variation.itemName,
                            // options: variation.options,
                            // status: variation.status,
                            // iconType: variation.iconType || "size", // Pass the icon type as a string instead of a React element
                          },
                        },
                      })
                    }
                    className="p-2 text-blue-600 rounded-md   hover:text-blue-900 "
                  >
                    <FaEdit />
                  </button>
                  <div>
                    {message && <div style={{ color: "green" }}>{message}</div>}
                    {error && <div style={{ color: "red" }}>{error}</div>}
                    <ul>
                      {item.variation.map((variation) => (
                        <li
                          key={variation._id}
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <span style={{ flex: 1 }}>{variation.name}</span>
                          <button onClick={() => handleDelete(variation._id)}>
                            <FaTrash color="red" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {message && (
                    <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
                      {message}
                    </div>
                  )}
                  {error && (
                    <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
                      {error}
                    </div>
                  )}
                </div>
              </div> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Variation;
