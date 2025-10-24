import React, { useState, useEffect } from 'react';

const RealTimeOrders = () => {
  const [orders, setOrders] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState('Connecting...');

  useEffect(() => {
    const eventSource = new EventSource('http://localhost:4000/api/sse/orders');

    eventSource.onopen = () => {
      setConnectionStatus('Connected');
    };

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        
        if (data.type === 'initial' || data.type === 'update') {
          setOrders(data.orders);
        }
      } catch (error) {
        console.error('Error parsing SSE data:', error);
      }
    };

    eventSource.onerror = () => {
      setConnectionStatus('Connection Error');
    };

    return () => {
      eventSource.close();
    };
  }, []);

  const getStatusBadge = (status) => {
    const statusMap = {
      1: { text: 'Pending', color: 'bg-yellow-500' },
      2: { text: 'Accepted', color: 'bg-blue-500' },
      3: { text: 'Preparing', color: 'bg-orange-500' },
      4: { text: 'Prepared', color: 'bg-purple-500' },
      5: { text: 'Out for Delivery', color: 'bg-indigo-500' },
      6: { text: 'Delivered', color: 'bg-green-500' }
    };
    
    const statusInfo = statusMap[status] || { text: 'Unknown', color: 'bg-gray-500' };
    
    return (
      <span className={`px-2 py-1 rounded-full text-white text-xs ${statusInfo.color}`}>
        {statusInfo.text}
      </span>
    );
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Real-Time Orders</h1>
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${connectionStatus === 'Connected' ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span className="text-sm">{connectionStatus}</span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  #{order._id.slice(-6)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.customer_id?.name || 'Unknown'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(order.order_status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ₹{order.total_amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleTimeString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {orders.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No orders found
          </div>
        )}
      </div>
    </div>
  );
};

export default RealTimeOrders;