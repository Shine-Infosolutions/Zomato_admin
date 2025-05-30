import React, { useState, useEffect } from "react";
import { FaSave, FaTrash, FaArrowLeft } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

const AddVariation = () => {
  const [itemName, setItemName] = useState("");
  const [itemId, setItemId] = useState("");
  const [stock, setStock] = useState("");
  const [varieties, setVarieties] = useState([{ name: "", price: "" }]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [items, setItems] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  // Fetch items dynamically from backend
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch(
          "https://hotelbuddhaavenue.vercel.app/api/user/items"
        );
        const data = await res.json();
        setItems(data.itemsdata);
      } catch (err) {
        setError("Failed to fetch items");
      }
    };
    fetchItems();
  }, []);

  // Check if we're editing an existing variation
  useEffect(() => {
    if (location.state && location.state.variation) {
      const {
        id,
        itemId: navItemId,
        itemName,
        price,
        options,
      } = location.state.variation;
      setItemId(navItemId || "");
      setItemName(itemName || "");
      // setItemName(itemName || name);
      // setVariationPrice(price || "");
      setStock(options && options.length ? options[0].stock || "" : "");
      // Check if options are objects with name and price or just strings
      if (options && Array.isArray(options)) {
        if (
          options[0] &&
          typeof options[0] === "object" &&
          "name" in options[0]
        ) {
          // Options with name and price
          setVarieties(
            options.map((opt) => ({
              _id: opt._id,
              name: opt.name || "",
              price: opt.price || 0,
            }))
          );
        } else {
          // Simple string options
          setVarieties(
            options.map((opt) => ({
              name: opt || "",
              price: 0,
            }))
          );
        }
      }

      setIsEditing(true);
      setEditId(id);
    }
  }, [location]);

  // // Add this useEffect to fetch items from Items.jsx
  // useEffect(() => {
  //   // Get the items from Items.jsx
  //   const itemsFromItemsComponent = [
  //     {
  //       id: 1,
  //       name: "Butter Chicken",
  //     },
  //     {
  //       id: 2,
  //       name: "Burger",
  //     },
  //     {
  //       id: 3,
  //       name: "mojito",
  //     },
  //   ];

  //   setItems(itemsFromItemsComponent);
  // }, []);

  const handleAddVariety = () => {
    // Prevent adding if an empty name already exists
    if (varieties.some((v) => v.name.trim() === "")) {
      window.alert("Please fill the existing empty variety name first!");
      return;
    }
    setVarieties([...varieties, { name: "", price: "" }]);
  };

  const handleRemoveVariety = async (index) => {
    // If editing (variation exists in DB), call the delete API
    if (isEditing && varieties[index]._id) {
      try {
        const res = await fetch(
          "https://hotelbuddhaavenue.vercel.app/api/admin/deletevariation",
          {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              variationId: varieties[index]._id,
              itemId: itemId,
            }),
          }
        );
        const data = await res.json();
        console.log("Delete API response:", data);
        if (!res.ok) {
          setError(data.message || "Failed to delete variety.");
          return;
        }
      } catch {
        setError("Network error while deleting variety.");
        return;
      }
    }
    // Remove from local state
    const newVarieties = [...varieties];
    newVarieties.splice(index, 1);
    setVarieties(newVarieties);
  };

  const handleVarietyChange = (index, field, value) => {
    let newValue = value;
    if (field === "price") {
      newValue = Number(value);
      if (newValue < 0) return; // Prevent negative prices
    }

    // Check for duplicate: same name (case-insensitive) and same price, but different index
    const nameToCheck =
      field === "name"
        ? value.trim().toLowerCase()
        : varieties[index].name.trim().toLowerCase();
    const priceToCheck =
      field === "price" ? Number(value) : Number(varieties[index].price);

    const isDuplicate = varieties.some(
      (v, i) =>
        i !== index &&
        v.name.trim().toLowerCase() === nameToCheck &&
        Number(v.price) === priceToCheck
    );
    if (isDuplicate) {
      window.alert("This variety already exists!");
      return;
    }

    const updatedVarieties = [...varieties];
    updatedVarieties[index][field] = newValue;
    setVarieties(updatedVarieties);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    // Check for duplicate variation names (case-insensitive)
    const price = varieties.map((v) => v.name.trim().toLowerCase());
    const hasDuplicate = varieties.some((v, idx) =>
      varieties.some(
        (v2, idx2) =>
          idx !== idx2 &&
          v.name.trim().toLowerCase() === v2.name.trim().toLowerCase() &&
          Number(v.price) === Number(v2.price)
      )
    );
    if (hasDuplicate) {
      setError("Duplicate variety with the same price is not allowed.");
      return;
    }

    let allSuccess = true;
    for (const variety of varieties) {
      const payload = {
        name: variety.name,
        stock: Number(stock),
        price: Number(variety.price),
        itemId: itemId, // Use the selected item's _id
      };
      // Print the payload to the console for debugging
      console.log("Submitting payload:", payload);

      try {
        const response = await fetch(
          "https://hotelbuddhaavenue.vercel.app/api/admin/addvariation",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          }
        );
        const data = await response.json();
        // Print the response for debugging
        console.log("API response:", data);

        if (
          !(
            response.ok &&
            data.message === "Variation added and linked to item successfully"
          )
        ) {
          allSuccess = false;
          setError(data.message || `Failed to add variety: ${variety.name}`);
          break;
        }
      } catch (err) {
        allSuccess = false;
        setError("Network error");
        break;
      }
    }

    if (allSuccess) {
      setMessage("All varieties added successfully!");
      setStock("");
      setVarieties([{ name: "", price: "" }]);
      navigate("/dashboard/variation");
    }
  };

  return (
    <div className="p-2 sm:p-6 bg-red-50">
      <div className="mb-6 flex items-center">
        <button
          onClick={() => navigate("/dashboard/variation")}
          className="mr-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200"
        >
          <FaArrowLeft />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {isEditing ? "Update Variation" : "Add New Variation"}
          </h1>
          <p className="text-gray-600 text-sm">
            {isEditing ? "Edit variation details" : "Create a new variation"}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
        <form onSubmit={handleSubmit}>
          {/* Variation Name */}
          <div className="mb-4">
            <label
              htmlFor="itemName"
              className="block text-gray-700 font-medium mb-2"
            >
              Item Name
            </label>
            <select
              id="itemName"
              value={itemId}
              onChange={(e) => {
                setItemId(e.target.value);
                const selected = items.find(
                  (item) => item._id === e.target.value
                );
                setItemName(selected ? selected.name : "");
              }}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
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
          {/* <div className="mb-4">
            <label
              htmlFor="variationPrice"
              className="block text-gray-700 font-medium mb-2"
            >
              Variation Price
            </label>
            <input
              type="number"
              id="variationPrice"
              value={variationPrice || ""}
              onChange={(e) => setVariationPrice(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="₹"
              required
            />
          </div> */}

          {/* Stock */}
          <div className="mb-4">
            <label
              htmlFor="stock"
              className="block text-gray-700 font-medium mb-2"
            >
              Stock
            </label>
            <input
              type="number"
              id="stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Enter available stock"
              min="0"
              required
            />
          </div>

          {/* Varieties */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-gray-700 font-medium">
                Varieties
              </label>
              <button
                type="button"
                onClick={handleAddVariety}
                className="text-sm bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
              >
                Add Variety
              </button>
            </div>

            <div className="space-y-2">
              {varieties.map((variety, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={variety.name}
                    onChange={(e) =>
                      handleVarietyChange(index, "name", e.target.value)
                    }
                    className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder={`Variety ${index + 1}`}
                    required
                  />
                  <input
                    type="number"
                    value={variety.price}
                    onChange={(e) =>
                      handleVarietyChange(index, "price", e.target.value)
                    }
                    className="w-24 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="₹"
                  />
                  {varieties.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveVariety(index)}
                      className="p-2 text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-lg hover:from-red-600 hover:to-red-700 transition-all shadow-sm"
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
