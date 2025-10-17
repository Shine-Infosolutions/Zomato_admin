import React, { useState, useEffect } from "react";
import { FaSearch, FaEye, FaCheck, FaTimes, FaClock, FaTruck } from "react-icons/fa";
import { BiSolidFoodMenu } from "react-icons/bi";
import { fetchAllOrdersAdmin, updateOrderStatus as updateOrderStatusAPI, formatDate, getStatusColor } from '../services/api';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const loadOrders = async () => {
    setLoading(true);
    setError(null);
    
    const result = await fetchAllOrdersAdmin();
    
    if (result.success) {
      setOrders(result.orders);
      setFilteredOrders(result.orders);
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  useEffect(() => {
    let filtered = orders;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(order =>
        order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (order.phone && order.phone.includes(searchTerm)) ||
        (order.delivery_boy && order.delivery_boy.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter(order => getStatusText(order.order_status) === statusFilter);
    }

    setFilteredOrders(filtered);
  }, [searchTerm, statusFilter, orders]);

  const getStatusText = (statusCode) => {
    switch (statusCode) {
      case 1:
        return "Pending";
      case 2:
        return "Preparing";
      case 3:
        return "Out for Delivery";
      case 4:
        return "Delivered";
      case 5:
        return "Cancelled";
      default:
        return "Pending";
    }
  };

  const getStatusColor = (statusCode) => {
    const status = getStatusText(statusCode);
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Preparing":
        return "bg-blue-100 text-blue-800";
      case "Out for Delivery":
        return "bg-purple-100 text-purple-800";
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (statusCode) => {
    const status = getStatusText(statusCode);
    switch (status) {
      case "Pending":
        return <FaClock className="text-yellow-600" />;
      case "Preparing":
        return <BiSolidFoodMenu className="text-blue-600" />;
      case "Out for Delivery":
        return <FaTruck className="text-purple-600" />;
      case "Delivered":
        return <FaCheck className="text-green-600" />;
      case "Cancelled":
        return <FaTimes className="text-red-600" />;
      default:
        return <FaClock className="text-gray-600" />;
    }
  };

  const updateOrderStatus = async (orderId, newStatusCode) => {
    try {
      const result = await updateOrderStatusAPI(orderId, newStatusCode);
      
      if (result.success) {
        setOrders(prevOrders =>
          prevOrders.map(order =>
            order._id === orderId ? { ...order, order_status: newStatusCode } : order
          )
        );
        alert(`Order ${orderId} status updated to ${getStatusText(newStatusCode)}`);
      } else {
        alert("Error updating order status");
      }
    } catch (error) {
      alert("Error updating order status");
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.order_status === 1).length,
    preparing: orders.filter(o => o.order_status === 2).length,
    outForDelivery: orders.filter(o => o.order_status === 3).length,
    delivered: orders.filter(o => o.order_status === 4).length
  };

  if (loading) {
    return (
      <div className="p-6 bg-red-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 text-red-700 p-4 rounded-md">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-2 sm:p-6 bg-red-50 min-h-screen max-w-full overflow-hidden">
      {/* Stats Cards */}
      <div className="mb-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          <div className="bg-white p-3 sm:p-4 rounded-lg shadow">
            <div className="text-center">
              <p className="text-xs text-gray-500">Total Orders</p>
              <h3 className="text-lg sm:text-xl font-bold text-gray-800">{stats.total}</h3>
            </div>
          </div>
          <div className="bg-white p-3 sm:p-4 rounded-lg shadow">
            <div className="text-center">
              <p className="text-xs text-gray-500">Pending</p>
              <h3 className="text-lg sm:text-xl font-bold text-yellow-600">{stats.pending}</h3>
            </div>
          </div>
          <div className="bg-white p-3 sm:p-4 rounded-lg shadow">
            <div className="text-center">
              <p className="text-xs text-gray-500">Preparing</p>
              <h3 className="text-lg sm:text-xl font-bold text-blue-600">{stats.preparing}</h3>
            </div>
          </div>
          <div className="bg-white p-3 sm:p-4 rounded-lg shadow">
            <div className="text-center">
              <p className="text-xs text-gray-500">Out for Delivery</p>
              <h3 className="text-lg sm:text-xl font-bold text-purple-600">{stats.outForDelivery}</h3>
            </div>
          </div>
          <div className="bg-white p-3 sm:p-4 rounded-lg shadow">
            <div className="text-center">
              <p className="text-xs text-gray-500">Delivered</p>
              <h3 className="text-lg sm:text-xl font-bold text-green-600">{stats.delivered}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4 sm:p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search by Order ID, Phone, or Delivery Boy..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
          >
            <option value="all">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Preparing">Preparing</option>
            <option value="Out for Delivery">Out for Delivery</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders Cards */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-700 text-lg">Orders ({filteredOrders.length})</h3>
        



      </div>
    </div>
  );
};

export default OrderManagement;