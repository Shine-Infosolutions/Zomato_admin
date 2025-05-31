import React from "react";
import {
  FaPrint,
  FaPlus,
  FaMoneyBill,
  FaUtensils,
  FaUser,
  FaPhone,
} from "react-icons/fa";
import { IoIosCall } from "react-icons/io";

const DineInDetails = ({ order }) => {
  // Sample order data if no order is provided
  const sampleOrder = {
    id: "DI-001",
    table: "Table 3",
    customer: "Zoya Akhtar",
    phone: "8400585115",
    items: [
      {
        name: "Dal Khichdi in desi ghee",
        qty: 1,
        description: "Mini 250 gm, SERVE 1",
      },
      {
        name: "Takde Wali Dal Fry",
        qty: 1,
        description: "Mini 250 gm, SERVE 1",
      },
    ],
    additionalItems: [
      { name: "in desi ghee", qty: 1, description: "Mini 250 gm, SERVE 1" },
      {
        name: "Takde Wali Dal Fry",
        qty: 1,
        description: "Mini 250 gm, SERVE 1",
      },
    ],
  };

  const displayOrder = order || sampleOrder;

  return (
    <div className="border border-gray-300 rounded-lg shadow-lg p-6 max-w-2xl mx-auto  to-white">
      {/* Header with logo and table info */}
      <div className="flex justify-between items-center mb-6 p-4 bg-[#983700]/10 rounded-lg border-l-4 border-[#983700]">
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold text-[#983700]">WHEAT LEAF</h2>
          <span className="text-gray-600 text-sm">Premium Restaurant</span>
          <div className="mt-2 bg-[#983700] text-white px-3 py-1 rounded-full text-sm inline-flex items-center">
            <span>Token #1</span>
          </div>
        </div>
        <div className="h-16 w-16 bg-[#983700] rounded-full flex items-center justify-center text-white">
          <FaUtensils size={24} />
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-[#983700]">
            {displayOrder.table}
          </div>
          <div className="text-sm text-gray-600">Dine-In</div>
        </div>
      </div>

      {/* Customer info */}
      <div className="flex justify-between items-center mb-6 bg-[#983700] text-white p-4 rounded-lg shadow-md">
        <div className="flex items-center gap-2">
          <FaUser />
          <span>Name: {displayOrder.customer}</span>
        </div>
        <div className="flex items-center gap-2">
          <IoIosCall />
          <span>Contact: {displayOrder.phone}</span>
        </div>
      </div>

      {/* Order items */}
      <div className="mb-6 bg-amber-50 rounded-lg p-4 shadow-inner">
        <h3 className="font-semibold text-[#983700] mb-3 border-b border-amber-200 pb-2">
          Order Items
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <ul className="space-y-3">
              {displayOrder.items.map((item, idx) => (
                <li
                  key={idx}
                  className="border-b border-amber-100 pb-2 last:border-0"
                >
                  <div className="font-medium">
                    {item.qty} ✕ {item.name}
                  </div>
                  {item.description && (
                    <p className="text-gray-500 text-sm font-medium">
                      ({item.description})
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <ul className="space-y-3">
              {displayOrder.additionalItems.map((item, idx) => (
                <li
                  key={idx}
                  className="border-b border-amber-100 pb-2 last:border-0"
                >
                  <div className="font-medium">
                    {item.qty} ✕ {item.name}
                  </div>
                  {item.description && (
                    <p className="text-gray-500 text-sm font-medium">
                      ({item.description})
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Total amount */}
      <div className="flex justify-between items-center p-3 bg-[#983700]/10 rounded-lg mb-6">
        <span className="font-bold text-lg text-gray-800">Total Amount:</span>
        <span className="font-bold text-xl text-[#983700]">₹650</span>
      </div>

      {/* Action buttons */}
      <div className="flex justify-end space-x-4 mt-6">
        <button className="bg-[#a66625] text-white px-4 py-2 rounded-lg hover:bg-[#983700] transition-colors flex items-center gap-2 shadow-md">
          <FaPlus />
          <span>Add Item</span>
        </button>
        <button className="bg-[#a66625] text-white px-4 py-2 rounded-lg hover:bg-[#983700] transition-colors flex items-center gap-2 shadow-md">
          <FaMoneyBill />
          <span>Bill Amount</span>
        </button>
        <button className="bg-[#a66625] text-white px-4 py-2 rounded-lg hover:bg-[#983700] transition-colors flex items-center gap-2 shadow-md">
          <FaPrint />
          <span>Print KOT</span>
        </button>
      </div>
    </div>
  );
};

export default DineInDetails;
