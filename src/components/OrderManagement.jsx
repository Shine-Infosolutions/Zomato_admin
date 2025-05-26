// src/components/OrderManagement.jsx
import React, { useState } from "react";
import {
  FaShoppingBag,
  FaClipboardList,
  FaTruck,
  FaCheck,
  FaTimes,
  FaSearch,
  FaFilter,
  FaCalendarAlt,
  FaChartBar,
  FaMoneyBillWave,
} from "react-icons/fa";

const OrderManagement = () => {
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState("today");

  // Sample data for the dashboard
  const stats = {
    totalOrders: 156,
    pendingOrders: 24,
    processingOrders: 18,
    deliveredOrders: 114,
    totalRevenue: 25680,
    averageOrderValue: 164.62,
  };

  // Sample data for orders
  const orders = [
    {
      id: "ORD-001",
      customer: "John Doe",
      items: 3,
      total: 450,
      status: "pending",
      date: "2023-06-15",
    },
    {
      id: "ORD-002",
      customer: "Jane Smith",
      items: 2,
      total: 280,
      status: "processing",
      date: "2023-06-15",
    },
    {
      id: "ORD-003",
      customer: "Robert Brown",
      items: 5,
      total: 720,
      status: "delivered",
      date: "2023-06-14",
    },
    {
      id: "ORD-004",
      customer: "Emily Wilson",
      items: 1,
      total: 150,
      status: "delivered",
      date: "2023-06-14",
    },
    {
      id: "ORD-005",
      customer: "Michael Clark",
      items: 4,
      total: 560,
      status: "cancelled",
      date: "2023-06-13",
    },
  ];

  // Filter orders based on status and search term
  const filteredOrders = orders.filter((order) => {
    const matchesStatus =
      filterStatus === "all" || order.status === filterStatus;
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Get status icon based on order status
  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <FaClipboardList className="text-yellow-500" />;
      case "processing":
        return <FaTruck className="text-blue-500" />;
      case "delivered":
        return <FaCheck className="text-green-500" />;
      case "cancelled":
        return <FaTimes className="text-red-500" />;
      default:
        return <FaClipboardList className="text-gray-500" />;
    }
  };

  // Get status color based on order status
  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-2 sm:p-6 bg-red-50">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Order Management
        </h1>
        <p className="text-gray-600">Manage and track all your orders</p>
      </div>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Orders</p>
              <h3 className="text-2xl font-bold text-gray-800">
                {stats.totalOrders}
              </h3>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <FaShoppingBag className="text-xl text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Pending Orders</p>
              <h3 className="text-2xl font-bold text-yellow-600">
                {stats.pendingOrders}
              </h3>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <FaClipboardList className="text-xl text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Processing Orders</p>
              <h3 className="text-2xl font-bold text-blue-600">
                {stats.processingOrders}
              </h3>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <FaTruck className="text-xl text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Delivered Orders</p>
              <h3 className="text-2xl font-bold text-green-600">
                {stats.deliveredOrders}
              </h3>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <FaCheck className="text-xl text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Revenue</p>
              <h3 className="text-2xl font-bold text-gray-800">
                ₹{stats.totalRevenue.toLocaleString()}
              </h3>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <FaMoneyBillWave className="text-xl text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Average Order Value</p>
              <h3 className="text-2xl font-bold text-gray-800">
                ₹{stats.averageOrderValue}
              </h3>
            </div>
            <div className="p-3 bg-indigo-100 rounded-full">
              <FaChartBar className="text-xl text-indigo-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>

          <div className="flex gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>

            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="all">All Time</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
          <h3 className="font-semibold text-gray-700">Recent Orders</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{order.items}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ₹{order.total}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {getStatusIcon(order.status)}
                      <span className="ml-1 capitalize">{order.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{order.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      View
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredOrders.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            No orders found matching your criteria
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderManagement;
