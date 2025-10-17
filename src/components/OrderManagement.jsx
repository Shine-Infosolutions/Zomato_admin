import React, { useState, useEffect } from "react";
import { FaSearch, FaEye, FaCheck, FaTimes, FaClock, FaTruck } from "react-icons/fa";
import { BiSolidFoodMenu } from "react-icons/bi";
import { fetchAllOrdersAdmin, updateOrderStatus as updateOrderStatusAPI } from '../services/api';

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
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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

      {/* Orders */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-700 text-lg">Orders ({filteredOrders.length})</h3>
        
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <BiSolidFoodMenu className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No orders found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || statusFilter !== "all" 
                ? 'Try adjusting your search or filter criteria.' 
                : 'No orders have been placed yet.'}
            </p>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div key={order._id} className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <div className="font-medium text-gray-900 text-lg">Order #{order._id?.slice(-8)}</div>
                  <div className="text-sm text-gray-500">{formatDate(order.createdAt)}</div>
                </div>
                <div className="flex items-center">
                  {getStatusIcon(order.order_status)}
                  <span className={`ml-2 px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(order.order_status)}`}>
                    {getStatusText(order.order_status)}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-sm mb-2"><span className="font-medium text-gray-700">Customer:</span> {order.customer_id?.name || 'Unknown Customer'}</div>
                  <div className="text-sm mb-2"><span className="font-medium text-gray-700">Phone:</span> {order.phone || 'N/A'}</div>
                  <div className="text-sm mb-2"><span className="font-medium text-gray-700">Amount:</span> ₹{order.total_amount || order.amount || 0}</div>
                  <div className="text-sm mb-2"><span className="font-medium text-gray-700">Payment:</span> {order.payment_status || 'N/A'}</div>
                </div>
                <div>
                  <div className="text-sm mb-2"><span className="font-medium text-gray-700">Address:</span> 
                    {order.address ? (
                      <div className="ml-2 mt-1">
                        {order.address.house_no && <div>{order.address.house_no}</div>}
                        {order.address.street && <div>{order.address.street}</div>}
                        {order.address.city && <div>{order.address.city}, {order.address.state} {order.address.pincode}</div>}
                      </div>
                    ) : 'N/A'}
                  </div>
                  <div className="text-sm mb-2"><span className="font-medium text-gray-700">Items:</span>
                    {order.items && order.items.length > 0 ? (
                      <div className="ml-2 mt-1">
                        {order.items.map((item, index) => (
                          <div key={index} className="text-gray-600">
                            • {item.name || item.item_name || 'Unknown'} x{item.quantity || 1}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span className="text-gray-500 ml-1">No items found</span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-100">
                {order.order_status === 1 && (
                  <button onClick={() => updateOrderStatus(order._id, 2)} className="flex items-center bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-2 rounded-md text-sm transition-colors">
                    <FaCheck className="mr-1" /> Start Preparing
                  </button>
                )}
                {order.order_status === 2 && (
                  <button onClick={() => updateOrderStatus(order._id, 3)} className="flex items-center bg-purple-50 text-purple-600 hover:bg-purple-100 px-3 py-2 rounded-md text-sm transition-colors">
                    <FaTruck className="mr-1" /> Send for Delivery
                  </button>
                )}
                {order.order_status === 3 && (
                  <button onClick={() => updateOrderStatus(order._id, 4)} className="flex items-center bg-green-50 text-green-600 hover:bg-green-100 px-3 py-2 rounded-md text-sm transition-colors">
                    <FaCheck className="mr-1" /> Mark Delivered
                  </button>
                )}
                <button className="flex items-center bg-gray-50 text-gray-600 hover:bg-gray-100 px-3 py-2 rounded-md text-sm transition-colors">
                  <FaEye className="mr-1" /> View Details
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrderManagement;