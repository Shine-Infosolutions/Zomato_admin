// src/components/Variation.jsx
import React, { useState, useEffect } from "react";
import { FaSearch, FaPlus, FaEdit } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

const Variation = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [message, setMessage] = useState(""); // <-- Add this line
  const [error, setError] = useState(""); // <-- If not already present

  // useEffect(() => {
  //   const fetchItems = async () => {
  //     try {
  //       const res = await fetch(
  //         "https://hotelbuddhaavenue.vercel.app/api/user/items"
  //       );
  //       const data = await res.json();
  //       setItems(data.itemsdata || []);
  //     } catch {
  //       setError("Failed to fetch items");
  //     }
  //   };

  //   fetchItems();

  //   // Refetch when the page regains focus (user returns from editing)
  //   const handleFocus = () => fetchItems();
  //   window.addEventListener("focus", handleFocus);

  //   return () => {
  //     window.removeEventListener("focus", handleFocus);
  //   };
  // }, []);
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

  const handleDeleteVariation = async (itemId, variationId) => {
    if (!window.confirm("Are you sure you want to delete this variation?"))
      return;

    try {
      const res = await fetch(
        "https://hotelbuddhaavenue.vercel.app/api/admin/deletevariation",
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ variationId, itemId }),
        }
      );
      const data = await res.json();

      if (res.ok) {
        setItems((prev) =>
          prev.map((item) =>
            item._id === itemId
              ? {
                  ...item,
                  variation: item.variation.filter(
                    (v) => v._id !== variationId
                  ),
                }
              : item
          )
        );
        setMessage("Variation deleted successfully!");
      } else {
        setError(data.message || "Failed to delete variation");
      }
    } catch {
      setError("Network error");
    }
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
              <div className="flex-1 flex items-center justify-between">
                <h3 className="font-bold text-lg text-gray-800">{item.name}</h3>
                <button
                  className="ml-2 p-2 text-blue-600 rounded-md hover:text-blue-900"
                  onClick={() =>
                    navigate("/dashboard/add-variation", {
                      state: {
                        variation: {
                          id: item._id,
                          itemId: item._id,
                          itemName: item.name,
                          options: item.variation, // pass the variations array
                        },
                      },
                    })
                  }
                  title="Edit Variations"
                >
                  <FaEdit />
                </button>

                {/* <button
                  className=" px-3 py-1 text-xs font-semibold  "
                  onClick={() => handleDeleteItem(item._id)}
                  title="Delete Item"
                >
                  <FaTrash color="red" />
                </button> */}
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
                          <RxCross2 />
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
