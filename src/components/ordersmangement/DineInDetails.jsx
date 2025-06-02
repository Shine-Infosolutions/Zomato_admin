import React, { useState, useEffect } from "react";
import {
  FaPrint,
  FaPlus,
  FaMoneyBill,
  FaUtensils,
  FaUser,
  FaPhone,
  FaCheck,
} from "react-icons/fa";
import { IoIosCall } from "react-icons/io";
import wheat from "../../assets/wheat.jpg";

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
        price: 250,
        description: "Mini 250 gm, SERVE 1",
      },
      {
        name: "Takde Wali Dal Fry",
        qty: 1,
        price: 180,
        description: "Mini 250 gm, SERVE 1",
      },
    ],
    additionalItems: [
      {
        name: "in desi ghee",
        qty: 1,
        price: 120,
        description: "Mini 250 gm, SERVE 1",
      },
      {
        name: "Takde Wali Dal Fry",
        qty: 1,
        price: 100,
        description: "Mini 250 gm, SERVE 1",
      },
    ],
    status: "ordered",
  };

  const displayOrder = order || sampleOrder;

  // State variables
  const [orderStatus, setOrderStatus] = useState(
    displayOrder.status || "ordered"
  );
  const [totalAmount, setTotalAmount] = useState(0);
  const [isPrinted, setIsPrinted] = useState(false);

  // Calculate total amount
  useEffect(() => {
    const itemsTotal = displayOrder.items.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );
    const addonsTotal = displayOrder.additionalItems.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );
    setTotalAmount(itemsTotal + addonsTotal);
  }, [displayOrder]);

  // Handle status change
  const handleStatusChange = () => {
    if (orderStatus === "ordered") {
      setOrderStatus("preparing");
    } else if (orderStatus === "preparing") {
      setOrderStatus("served");
    }
  };

  // Handle print KOT
  const handlePrintKOT = () => {
    console.log("Printing KOT for order:", displayOrder.id);
    setIsPrinted(true);
    // In a real app, you would trigger the print functionality here
    setTimeout(() => setIsPrinted(false), 2000);
  };

  // Handle generate bill
  const handleGenerateBill = () => {
    console.log(
      "Generating bill for order:",
      displayOrder.id,
      "Amount:",
      totalAmount
    );
    // In a real app, you would trigger the bill generation here
  };

  return (
    <div className=" bg-[#fcf4e9]  min-h-screen shadow-lg p-4 rounded-2xl">
      <h1 className="text-center text-2xl mb-6 border-b border-amber-200 pb-2  text-[#983700]">
        DINE-IN
      </h1>
      <div className="border border-gray-300 max-w-2xl rounded-lg shadow-lg mx-auto bg-white w-full">
        {/* Header with logo and table info */}
        <div className="flex justify-between items-center p-4">
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold text-[#983700]">WHEAT LEAF</h2>
            <span className="text-gray-600 text-sm">Premium Restaurant</span>
            <div className="mt-2 bg-[#983700] text-white px-3 py-1 rounded-full text-sm inline-flex items-center">
              <span>Token #{displayOrder.id.split("-")[1] || "1"}</span>
            </div>
          </div>
          <div className="h-16 w-16 rounded-full flex items-center justify-center text-white">
            <img
              src={wheat}
              alt="wheat-leaf"
              className="rounded-full border border-[#983700]"
            />
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[#983700]">
              {displayOrder.table}
            </div>
            {/* <div className="text-sm text-gray-600">Dine-In</div> */}
            <div
              className={`mt-1 px-2 py-1 rounded-full text-xs text-white ${
                orderStatus === "ordered"
                  ? "bg-yellow-500"
                  : orderStatus === "preparing"
                  ? "bg-blue-500"
                  : "bg-green-500"
              }`}
            >
              {orderStatus === "ordered"
                ? "New Order"
                : orderStatus === "preparing"
                ? "Preparing"
                : "Served"}
            </div>
          </div>
        </div>

        {/* Customer info */}
        <div className="flex justify-between items-center bg-[#983700] text-white p-4 shadow-md">
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
        <div className="p-4 shadow-inner border-b border-amber-200">
          <h3 className="font-semibold text-[#983700] mb-3 pb-2">
            Order Items
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <ul className="space-y-3 text-xs">
                {displayOrder.items.map((item, idx) => (
                  <li key={idx} className="pb-2 last:border-0">
                    <div className="font-medium">
                      {item.qty} ✕ {item.name}
                    </div>
                    {item.description && (
                      <p className="text-gray-500 text-sm font-medium">
                        ({item.description})
                      </p>
                    )}
                    {/* <p className="text-right text-[#983700] font-medium">
                    ₹{item.price * item.qty}
                  </p> */}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <ul className="space-y-3 text-xs">
                {displayOrder.additionalItems.map((item, idx) => (
                  <li key={idx} className="pb-2 last:border-0">
                    <div className="font-medium">
                      {item.qty} ✕ {item.name}
                    </div>
                    {item.description && (
                      <p className="text-gray-500 text-sm font-medium">
                        ({item.description})
                      </p>
                    )}
                    {/* <p className="text-right text-[#983700] font-medium">
                    ₹{item.price * item.qty}
                  </p> */}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex justify-between items-center p-4">
          <button
            onClick={handleStatusChange}
            className={`px-4 py-2 rounded-lg text-white flex items-center gap-2 shadow-md ${
              orderStatus === "served"
                ? "bg-green-500"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={orderStatus === "served"}
          >
            <FaCheck />
            <span>
              {orderStatus === "ordered"
                ? "Start Preparing"
                : orderStatus === "preparing"
                ? "Mark as Served"
                : "Served"}
            </span>
          </button>

          <div className="flex space-x-2">
            <button
              className="bg-[#a66625] text-white px-4 py-2 rounded-lg hover:bg-[#983700] transition-colors flex items-center gap-2 shadow-md"
              onClick={() =>
                console.log("Adding item to order:", displayOrder.id)
              }
            >
              <FaPlus />
              <span>Add Item</span>
            </button>

            <button
              onClick={handleGenerateBill}
              className="bg-[#a66625] text-white px-4 py-2 rounded-lg hover:bg-[#983700] transition-colors flex items-center gap-2 shadow-md"
            >
              <span>Bill Amount:</span>
              <span>₹{totalAmount}</span>
            </button>

            <button
              onClick={handlePrintKOT}
              className={`${
                isPrinted ? "bg-green-500" : "bg-[#a66625]"
              } text-white px-4 py-2 rounded-lg hover:bg-[#983700] transition-colors flex items-center gap-2 shadow-md`}
            >
              <FaPrint />
              <span>{isPrinted ? "Printed!" : "Print KOT"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DineInDetails;
