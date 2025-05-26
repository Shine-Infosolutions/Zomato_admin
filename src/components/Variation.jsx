// src/components/Variation.jsx
import React, { useState } from "react";
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
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Sample data - replace with your actual data
  const variations = [
    {
      id: 1,
      name: "Size",
      itemName: "Pizza",
      options: ["Small", "Medium", "Large"],
      status: "Publish",
      icon: <FaLayerGroup className="text-amber-500" />,
    },
    {
      id: 2,
      name: "Spice Level",
      itemName: "Curry",
      options: ["Mild", "Medium", "Hot", "Extra Hot"],
      status: "Publish",
      icon: <FaFilter className="text-red-500" />,
    },
    {
      id: 3,
      name: "Toppings",
      itemName: "Ice Cream",
      options: [
        "Chocolate",
        "Sprinkles",
        "Nuts",
        "Caramel",
        "Fruits",
        "Whipped Cream",
      ],
      status: "Unpublish",
      icon: <MdOutlineColorLens className="text-purple-500" />,
    },
    {
      id: 4,
      name: "Temperature",
      itemName: "Coffee",
      options: ["Hot", "Warm", "Iced"],
      status: "Publish",
      icon: <MdOutlineLocalDrink className="text-blue-500" />,
    },
    {
      id: 5,
      name: "Sweetness",
      itemName: "Desert",
      options: ["No Sugar", "Less Sugar", "Normal", "Extra Sweet"],
      status: "Publish",
      icon: <GrCubes className="text-yellow-500" />,
    },
  ];

  const handleDelete = (id) => {
    console.log("Deleting variation with id:", id);
    alert(`Variation with ID ${id} has been deleted`);
  };

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
        {variations.map((variation) => (
          <div
            key={variation.id}
            className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center p-4 border-b border-gray-200">
              <div className="p-3 rounded-full bg-gray-100 mr-4">
                {variation.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-800">
                  {variation.name}
                </h3>
                <p className="text-sm text-gray-500">
                  Applied to: {variation.itemName}
                </p>
              </div>
              <span
                className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  variation.status === "Publish"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {variation.status}
              </span>
            </div>

            <div className="p-4">
              <div className="mb-3">
                <h4 className="text-sm font-medium text-gray-500 mb-2">
                  Options:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {variation.options.map((option, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs"
                    >
                      {option}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-200">
                <span className=" text-gray-500">ID: {variation.id}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      navigate("/dashboard/add-variation", {
                        state: {
                          variation: {
                            id: variation.id,
                            name: variation.name,
                            itemName: variation.itemName,
                            options: variation.options,
                            status: variation.status,
                            iconType: variation.iconType || "size", // Pass the icon type as a string instead of a React element
                          },
                        },
                      })
                    }
                    className="p-2 text-blue-600 rounded-md   hover:text-blue-900 "
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(variation.id)}
                    className="p-2 text-red-600 rounded-md hover:text-red-900"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Variation;
