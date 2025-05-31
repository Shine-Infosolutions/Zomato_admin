import React from "react";
import {
  FaPrint,
  FaCheck,
  FaClock,
  FaMotorcycle,
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

const OnlineDetails = ({ order }) => {
  // Sample order data if no order is provided
  const sampleOrder = {
    id: "OL-001",
    platform: "Zomato",
    customer: "Zoya Akhtar",
    phone: "5465466575767",
    otp: "34567",
    isPaid: true,
    address: "Humayunpur near tarang",
    items: [
      {
        name: "Peanut Sabudana Khichdi",
        qty: 1,
        price: 350,
        note: "extra extra",
      },
      { name: "Dal Khichdi", qty: 1, price: 150, note: "extra extra" },
    ],
    addons: [{ name: "extra Cheese", price: 50 }],
    prepTime: 20,
    status: "preparing",
    total: 500,
  };

  const displayOrder = order || sampleOrder;

  const handleFoodReady = () => {
    console.log("Food is ready for order:", displayOrder.id);
  };

  return (
    <div className="border border-gray-300 rounded-lg shadow-lg p-6 max-w-2xl mx-auto  to-white w-full">
      {/* Header with logo and order info */}
      <div className="flex justify-between items-center mb-6 p-4 bg-[#983700]/10 rounded-lg border-l-4 border-[#983700]">
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold text-[#983700]">WHEAT LEAF</h2>
          <span className="text-gray-600 text-sm">Premium Restaurant</span>
          <div className="mt-2 text-gray-700 text-sm">KOT:101 | Bill:1085</div>
        </div>
        <div className="h-16 w-16 bg-[#983700] rounded-full flex items-center justify-center text-white">
          <FaMotorcycle size={24} />
        </div>
        <div className="text-center">
          <div className="flex gap-2 mb-2">
            <div
              className={`px-3 py-1 rounded-full text-white ${
                displayOrder.isPaid ? "bg-green-600" : "bg-yellow-600"
              }`}
            >
              {displayOrder.isPaid ? "Paid" : "COD"}
            </div>
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
              OTP: {displayOrder.otp}
            </div>
          </div>
          <div className="text-sm font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded">
            {displayOrder.platform || "Zomato"}
          </div>
        </div>
      </div>

      {/* Customer info */}
      <div className="flex justify-between items-center mb-6 bg-[#983700] text-white p-4 rounded-lg shadow-md">
        <div className="flex items-center gap-2">
          <FaUser />
          <span>Name: {displayOrder.customer}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaPhone />
          <span>Contact: {displayOrder.phone}</span>
        </div>
      </div>

      {/* Address */}
      <div className="mb-6 bg-gray-100 p-4 rounded-lg flex items-start gap-2">
        <FaMapMarkerAlt className="text-[#983700] mt-1" />
        <p>{displayOrder.address}</p>
      </div>

      {/* Order items */}
      <div className="mb-6 bg-amber-50 rounded-lg p-4 shadow-inner">
        <h3 className="font-semibold text-[#983700] mb-3 border-b border-amber-200 pb-2">
          Order Items
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <ul className="space-y-3">
              {displayOrder.items
                .slice(0, Math.ceil(displayOrder.items.length / 2))
                .map((item, idx) => (
                  <li
                    key={idx}
                    className="border-b border-amber-100 pb-2 last:border-0"
                  >
                    <div className="font-medium">
                      {item.qty} ✕ {item.name}
                    </div>
                    {item.note && (
                      <p className="text-gray-500 text-sm font-medium">
                        {item.note}
                      </p>
                    )}
                  </li>
                ))}
            </ul>
          </div>
          <div>
            <ul className="space-y-3">
              {displayOrder.items
                .slice(Math.ceil(displayOrder.items.length / 2))
                .map((item, idx) => (
                  <li
                    key={idx}
                    className="border-b border-amber-100 pb-2 last:border-0"
                  >
                    <div className="font-medium">
                      {item.qty} ✕ {item.name}
                    </div>
                    {item.note && (
                      <p className="text-gray-500 text-sm font-medium">
                        {item.note}
                      </p>
                    )}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Add-ons */}
      {displayOrder.addons && displayOrder.addons.length > 0 && (
        <div className="flex items-center justify-between p-4 border-b border-gray-300 mb-6">
          <p className="font-medium text-gray-700">
            Add-ons [{displayOrder.addons.map((a) => a.name).join(", ")}]
          </p>
          <div className="flex gap-4">
            <button className="bg-[#a66625] text-white px-4 py-2 rounded">
              ₹{" "}
              {displayOrder.addons.reduce((sum, addon) => sum + addon.price, 0)}
            </button>
            <button className="bg-[#a66625] text-white px-4 py-2 rounded">
              Cutlery
            </button>
          </div>
        </div>
      )}

      {/* Total amount */}
      <div className="flex justify-between items-center p-3 bg-[#983700]/10 rounded-lg mb-6">
        <span className="font-bold text-lg text-gray-800">Total Amount:</span>
        <span className="font-bold text-xl text-[#983700]">
          ₹{displayOrder.total}
        </span>
      </div>

      {/* Preparation time */}
      <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg mb-6 border border-blue-200">
        <FaClock className="text-blue-600 text-xl" />
        <div>
          <h3 className="font-medium text-gray-700">Preparation Time</h3>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-blue-600">
              {displayOrder.prepTime}
            </span>
            <span className="text-gray-600">minutes</span>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex justify-end space-x-4 mt-6">
        {/* <button className="bg-[#a66625] text-white px-4 py-2 rounded-lg hover:bg-[#983700] transition-colors flex items-center gap-2 shadow-md">
          <FaPrint />
          <span>Print KOT</span>
        </button>
        <button className="bg-[#a66625] text-white px-4 py-2 rounded-lg hover:bg-[#983700] transition-colors flex items-center gap-2 shadow-md">
          <FaPrint />
          <span>Print Bill</span>
        </button> */}
        {displayOrder.status === "preparing" && (
          <button
            onClick={handleFoodReady}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 shadow-md"
          >
            <FaCheck />
            <span>Food is Ready</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default OnlineDetails;
