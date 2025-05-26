// src/components/AddVariation.jsx
import React, { useState, useEffect } from "react";
import {
  FaSave,
  FaPlus,
  FaTrash,
  FaLayerGroup,
  FaFilter,
} from "react-icons/fa";
import { MdOutlineColorLens, MdOutlineLocalDrink } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";

const AddVariation = () => {
  const [variationName, setVariationName] = useState("");
  const [itemName, setItemName] = useState("");
  const [variationStatus, setVariationStatus] = useState("Publish");
  const [variationIcon, setVariationIcon] = useState("size");
  const [options, setOptions] = useState([{ name: "", price: "" }]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  // Check if we're editing an existing variation
  useEffect(() => {
    if (location.state && location.state.variation) {
      const { id, name, itemName, status, options } = location.state.variation;
      setVariationName(name);
      setItemName(itemName);
      setVariationStatus(status);
      setIsEditing(true);
      setEditId(id);

      // If options are available, set them
      if (options && Array.isArray(options)) {
        setOptions(options.map((opt) => ({ name: opt, price: "0" })));
      }
    }
  }, [location]);

  const handleAddOption = () => {
    setOptions([...options, { name: "", price: "" }]);
  };

  const handleRemoveOption = (index) => {
    if (options.length > 1) {
      const newOptions = [...options];
      newOptions.splice(index, 1);
      setOptions(newOptions);
    }
  };

  const handleOptionChange = (index, field, value) => {
    const newOptions = [...options];
    newOptions[index][field] = value;
    setOptions(newOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const variationData = {
      id: isEditing ? editId : Date.now(),
      name: variationName,
      itemName: itemName,
      status: variationStatus,
      icon: variationIcon,
      options: options.map((opt) => opt.name),
    };

    if (isEditing) {
      console.log("Variation updated:", variationData);
    } else {
      console.log("Variation added:", variationData);
    }

    navigate("/dashboard/variation");
  };

  const iconOptions = [
    {
      value: "size",
      label: "Size",
      icon: <FaLayerGroup className="text-amber-500" />,
    },
    {
      value: "spice",
      label: "Spice Level",
      icon: <FaFilter className="text-red-500" />,
    },
    {
      value: "color",
      label: "Color/Topping",
      icon: <MdOutlineColorLens className="text-purple-500" />,
    },
    {
      value: "temperature",
      label: "Temperature",
      icon: <MdOutlineLocalDrink className="text-blue-500" />,
    },
  ];

  return (
    <div className="p-2 sm:p-6 bg-red-50">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          {isEditing ? "Update Variation" : "Add New Variation"}
        </h1>
        <p className="text-gray-600">
          {isEditing
            ? "Edit variation details"
            : "Create a new variation for your menu items"}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label
                htmlFor="variationName"
                className="block text-gray-700 font-medium mb-2"
              >
                Variation Name
              </label>
              <input
                type="text"
                id="variationName"
                value={variationName}
                onChange={(e) => setVariationName(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="e.g. Size, Color, Spice Level"
                required
              />
            </div>

            {/* <div>
              <label
                htmlFor="itemName"
                className="block text-gray-700 font-medium mb-2"
              >
                Applied To Item
              </label>
              <input
                type="text"
                id="itemName"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Item this variation applies to"
                required
              />
            </div> */}

            {/* <div>
              <label
                htmlFor="variationStatus"
                className="block text-gray-700 font-medium mb-2"
              >
                Status
              </label>
              <select
                id="variationStatus"
                value={variationStatus}
                onChange={(e) => setVariationStatus(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              >
                <option value="Publish">Publish</option>
                <option value="Unpublish">Unpublish</option>
              </select>
            </div> */}

            {/* <div>
              <label className="block text-gray-700 font-medium mb-2">
                Variation Icon
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {iconOptions.map((icon) => (
                  <div
                    key={icon.value}
                    onClick={() => setVariationIcon(icon.value)}
                    className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer border ${
                      variationIcon === icon.value
                        ? "border-red-500 bg-red-50"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <div className="p-2 rounded-full bg-gray-100">
                      {icon.icon}
                    </div>
                    <span className="text-sm">{icon.label}</span>
                  </div>
                ))}
              </div>
            </div> */}
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <label className="block text-gray-700 font-medium">
                Variation Options
              </label>
              <button
                type="button"
                onClick={handleAddOption}
                className="flex items-center gap-1 text-sm bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
              >
                <FaPlus size={12} /> Add Option
              </button>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              {options.map((option, index) => (
                <div key={index} className="flex items-center gap-3 mb-3">
                  <div className="flex-1">
                    <label className="text-xs text-gray-500 mb-1 block">
                      Option Name
                    </label>
                    <input
                      type="text"
                      value={option.name}
                      onChange={(e) =>
                        handleOptionChange(index, "name", e.target.value)
                      }
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="e.g. Small, Medium, Large"
                      required
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-xs text-gray-500 mb-1 block">
                      Additional Price (₹)
                    </label>
                    <input
                      type="number"
                      value={option.price}
                      onChange={(e) =>
                        handleOptionChange(index, "price", e.target.value)
                      }
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
                  {options.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveOption(index)}
                      className="p-2  text-red-600 rounded-md   hover:text-red-900"
                    >
                      <FaTrash />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 justify-end border-t border-gray-100 pt-4">
            <button
              type="button"
              onClick={() => navigate("/dashboard/variation")}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex justify-center items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-lg hover:from-red-600 hover:to-red-700 transition-all shadow-sm"
            >
              <FaSave />
              <span>{isEditing ? "Update" : "Save"} Variation</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVariation;
