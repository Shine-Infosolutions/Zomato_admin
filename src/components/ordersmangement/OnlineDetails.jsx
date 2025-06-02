import React, { useState } from "react";
import {
  FaPrint,
  FaCheck,
  FaClock,
  FaMotorcycle,
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
  FaUserCheck,
} from "react-icons/fa";
import { IoIosCall } from "react-icons/io";
import { FaCube } from "react-icons/fa6";
import { BiSolidPhoneCall } from "react-icons/bi";
import { RiMotorbikeFill } from "react-icons/ri";

const OnlineDetails = ({ order }) => {
  // Sample order data if no order is provided
  const sampleOrder = {
    id: "OL-001",
    platform: "Zomato",
    rider: "Anil Rathod",
    riderphone: "9876543210",
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
        note: "serve with chutney",
      },
      { name: "Dal Khichdi", qty: 1, price: 150, note: "serve 1" },
    ],
    addons: [{ name: "extra Cheese", price: 50 }],
    prepTime: "01:50",
    status: "preparing",
    total: 500,
  };

  const displayOrder = order || sampleOrder;
  const [orderStatus, setOrderStatus] = useState(
    displayOrder.status || "preparing"
  );

  // Calculate total dynamically
  const total =
    displayOrder.items.reduce((sum, item) => sum + item.price * item.qty, 0) +
    (displayOrder.addons
      ? displayOrder.addons.reduce((sum, addon) => sum + addon.price, 0)
      : 0);

  // Action handlers
  // const handleFoodReady = () => {
  //   setOrderStatus("ready");
  // };
  // const handlePrintKOT = () => {
  //   setIsPrinted(true);
  //   setTimeout(() => setIsPrinted(false), 2000);
  // };
  // const handlePrintBill = () => {
  //   alert(`Printing Bill for order: ${displayOrder.id} - ₹${total}`);
  // };

  return (
    <div className="border border-gray-300 rounded-lg shadow-lg max-w-2xl mx-auto bg-white w-full">
      {/* Header with logo and order info */}
      <div className="flex justify-between items-center  p-4 border-b border-gray-300">
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold text-[#983700]">WHEAT LEAF</h2>
          <div className="mt-2 text-gray-700 text-sm">
            KOT: 101 | BILL : ₹{total}
          </div>
        </div>
        <div className="h-16 w-16 bg-[#983700] rounded-full flex items-center justify-center text-white">
          <FaMotorcycle size={24} />
        </div>
        <div className="text-center">
          <div className="flex  mb-2">
            <div
              className={`px-3 py-1  text-white ${
                displayOrder.isPaid ? "bg-green-600" : "bg-yellow-600"
              }`}
            >
              {displayOrder.isPaid ? "Paid" : "COD"}
            </div>
            <div className=" px-3 py-1 ">OTP: {displayOrder.otp}</div>
          </div>
          <div className="text-sm font-medium bg-blue-100 px-2 py-1 rounded">
            567894357
          </div>
        </div>
      </div>
      {/* Rider Information */}
      <div className=" flex justify-between items-center p-2 shadow-md">
        <div className="flex items-center gap-2">
          <RiMotorbikeFill className="text-2xl" />
          <span>{displayOrder.rider}</span>
        </div>
        <div className="flex items-center gap-2">
          <BiSolidPhoneCall className="text-2xl" />
          <span>{displayOrder.riderphone}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaUserCheck className="text-2xl" />
          <span className="ml-1">Assigned</span>
        </div>
      </div>
      {/* Customer info */}
      <div className=" justify-between items-LEFT  bg-[#983700] text-white p-4  mshadow-md">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex items-center gap-2">
            <span>{displayOrder.customer}</span>
          </div>
          |
          <div className="flex items-center gap-2">
            <BiSolidPhoneCall className="text-2xl" />
            <span>{displayOrder.phone}</span>
          </div>
        </div>
        <p>{displayOrder.address}</p>
      </div>
      {/* Address
      <div className="mb-6 bg-gray-100 p-4 rounded-lg flex items-start gap-2">
        <FaMapMarkerAlt className="text-[#983700] mt-1" />
        <p>{displayOrder.address}</p>
      </div> */}
      {/* Order items */}
      <div className="rounded-lg p-4 shadow-inner">
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
                      {item.qty} ✕ {item.name}{" "}
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
                      {item.qty} ✕ {item.name}{" "}
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
        <div className="flex items-center justify-between px-4 border-b border-gray-300 ">
          <p className="font-medium text-gray-700">
            Add-ons [{displayOrder.addons.map((a) => a.name).join(", ")}]
          </p>
          <div className="flex gap-4">
            <button className="bg-[#a66625] text-white px-4 py-2 ">
              ₹{" "}
              {displayOrder.addons.reduce((sum, addon) => sum + addon.price, 0)}
            </button>
          </div>
        </div>
      )}

      {/* Preparation time */}
      {/*  */}
      {/* Action buttons */}
      <div className="flex justify-between item-center space-x-4  p-4">
        {/* <button
          onClick={handlePrintKOT}
          className={`${
            isPrinted ? "bg-green-500" : "bg-[#a66625]"
          } text-white px-4 py-2 rounded-lg hover:bg-[#983700] transition-colors flex items-center gap-2 shadow-md`}
        >
          <FaPrint />
          <span>{isPrinted ? "Printed!" : "Print KOT"}</span>
        </button>
        <button
          onClick={handlePrintBill}
          className="bg-[#a66625] text-white px-4 py-2 rounded-lg hover:bg-[#983700] transition-colors flex items-center gap-2 shadow-md"
        >
          <FaPrint />
          <span>Print Bill</span>
        </button> */}

        <div>
          <h3 className="font-medium text-gray-700">Preparation Time</h3>
          <div className="flex items-center gap-2">
            <span className=" text-blue-600">{displayOrder.prepTime}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 text-2xl">
            <FaCube className=" text-red-600" />
            <span>Info</span>
          </div>
          <div>
            {orderStatus === "preparing" && (
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 shadow-md">
                <FaCheck />
                <span>Food is Ready</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnlineDetails;
