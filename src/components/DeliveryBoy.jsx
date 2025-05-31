// src/components/DeliveryBoy.jsx
import React, { useState, useEffect } from "react";
import {
  FaMotorcycle,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaExclamationTriangle,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const DeliveryBoy = () => {
  const [orders, setOrders] = useState([
    {
      id: "ORD-001",
      customer: "Shoaib Ahmad",
      address: "Zahidabad,Gorakhnath",
      status: "pending",
      time: "10:30 AM",
    },
    {
      id: "ORD-002",
      customer: "Zoya Akhtar",
      address: "Humayunpur Near Tarang Crossing",
      status: "in-progress",
      time: "11:15 AM",
    },
    {
      id: "ORD-003",
      customer: "Rahul Sharma",
      address: "Sector 15, Noida",
      status: "delivered",
      time: "12:00 PM",
    },
  ]);
  const [activeOrder, setActiveOrder] = useState(null);
  const navigate = useNavigate();
  const { user } = useAppContext();

  const handleOrderSelect = (order) => {
    setActiveOrder(order);
  };

  const handleStatusUpdate = (orderId, newStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const handleLogout = () => {
    // Handle logout logic here
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-red-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FaMotorcycle className="text-2xl  mb-[10px]" />
            <h1 className="text-xl font-bold">Delivery Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <FaUser className=" mb-[10px]" />
              <span>Delivery Agent</span>
            </div>
            <div className="flex items-center gap-2 md:gap-4">
              <span className="text-sm md:text-base text-gray-600 hidden sm:inline">
                {user?.email}
              </span>
              <button
                // onClick={handleLogout}
                className=" border-gray-300 shadow text-red-500 px-2 md:px-4 py-1 md:py-2 text-sm md:text-base rounded bg-white hover:bg-red-500 hover:text-white transition-colors"
              >
                Logout
              </button>
            </div>
            {/* <button
              onClick={handleLogout}
              className="bg-white text-red-600 px-4 py-1 rounded-full flex items-center gap-1 hover:bg-gray-100"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button> */}
          </div>
        </div>
      </header>

      <div className="container mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Orders List */}
        <div className="lg:col-span-1 bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg font-bold mb-4 text-gray-800 border-b pb-2">
            Today's Orders
          </h2>
          <div className="space-y-3">
            {orders.map((order) => (
              <div
                key={order.id}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  activeOrder?.id === order.id
                    ? "bg-red-100 border-l-4 border-red-500"
                    : "bg-gray-50 hover:bg-gray-100"
                }`}
                onClick={() => handleOrderSelect(order)}
              >
                <div className="flex justify-between items-center">
                  <span className="font-semibold">{order.id}</span>
                  <span className="text-sm text-gray-500">{order.time}</span>
                </div>
                <div className="mt-1 text-sm">{order.customer}</div>
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  <FaMapMarkerAlt className="mr-1" />
                  {order.address}
                </div>
                <div className="mt-2">
                  {order.status === "pending" && (
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                      Pending Pickup
                    </span>
                  )}
                  {order.status === "in-progress" && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                      In Progress
                    </span>
                  )}
                  {order.status === "delivered" && (
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                      Delivered
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Map and Active Order */}
        <div className="lg:col-span-2 space-y-4">
          {/* Map */}
          <div className="bg-white rounded-lg shadow-md p-4 h-64">
            <h2 className="text-lg font-bold mb-2 text-gray-800">
              Delivery Map
            </h2>
            <div className="bg-gray-200 h-48 rounded flex items-center justify-center">
              {/* Map would be integrated here */}
              <div className="text-gray-500">Map View</div>
            </div>
          </div>

          {/* Active Order Details */}
          {activeOrder && (
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-lg font-bold mb-4 text-gray-800 border-b pb-2">
                Order Details - {activeOrder.id}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h3 className="font-medium text-gray-700">Customer</h3>
                  <p>{activeOrder.customer}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-700">
                    Delivery Address
                  </h3>
                  <p>{activeOrder.address}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-700">Order Time</h3>
                  <p>{activeOrder.time}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-700">Status</h3>
                  <p className="capitalize">
                    {activeOrder.status.replace("-", " ")}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t">
                {activeOrder.status === "pending" && (
                  <button
                    onClick={() =>
                      handleStatusUpdate(activeOrder.id, "in-progress")
                    }
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-1"
                  >
                    <FaMotorcycle />
                    <span>Start Delivery</span>
                  </button>
                )}

                {activeOrder.status === "in-progress" && (
                  <>
                    <button
                      onClick={() =>
                        handleStatusUpdate(activeOrder.id, "delivered")
                      }
                      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center gap-1"
                    >
                      <FaCheckCircle />
                      <span>Mark as Delivered</span>
                    </button>
                    <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 flex items-center gap-1">
                      <FaExclamationTriangle />
                      <span>Report Delay</span>
                    </button>
                  </>
                )}

                {activeOrder.status === "delivered" && (
                  <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg flex items-center gap-1">
                    <FaCheckCircle />
                    <span>Successfully Delivered</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeliveryBoy;
