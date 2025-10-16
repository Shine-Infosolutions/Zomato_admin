import React, { useState } from "react";
import { FaSearch, FaPlus, FaEdit, FaTrash, FaUser, FaPhone, FaMotorcycle } from "react-icons/fa";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const DeliveryBoy = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingBoy, setEditingBoy] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    vehicleNumber: "",
    status: "Active"
  });

  // Sample data
  const [deliveryBoys, setDeliveryBoys] = useState([
    {
      id: 1,
      name: "Raj Kumar",
      phone: "+91-9876543210",
      email: "raj@delivery.com",
      vehicleNumber: "KA01AB1234",
      status: "Active",
      ordersDelivered: 145,
      rating: 4.8,
      joinedDate: "2024-01-15"
    },
    {
      id: 2,
      name: "Amit Singh",
      phone: "+91-9876543211",
      email: "amit@delivery.com",
      vehicleNumber: "KA02CD5678",
      status: "Active",
      ordersDelivered: 98,
      rating: 4.6,
      joinedDate: "2024-02-01"
    },
    {
      id: 3,
      name: "Suresh Reddy",
      phone: "+91-9876543212",
      email: "suresh@delivery.com",
      vehicleNumber: "KA03EF9012",
      status: "Inactive",
      ordersDelivered: 67,
      rating: 4.4,
      joinedDate: "2024-01-20"
    }
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingBoy) {
      // Update existing delivery boy
      setDeliveryBoys(prev => prev.map(boy => 
        boy.id === editingBoy.id 
          ? { ...boy, ...formData }
          : boy
      ));
      alert("Delivery boy updated successfully!");
    } else {
      // Add new delivery boy
      const newBoy = {
        id: Date.now(),
        ...formData,
        ordersDelivered: 0,
        rating: 0,
        joinedDate: new Date().toISOString().split('T')[0]
      };
      setDeliveryBoys(prev => [...prev, newBoy]);
      alert("Delivery boy added successfully!");
    }
    
    // Reset form
    setFormData({
      name: "",
      phone: "",
      email: "",
      vehicleNumber: "",
      status: "Active"
    });
    setShowAddForm(false);
    setEditingBoy(null);
  };

  const handleEdit = (boy) => {
    setFormData({
      name: boy.name,
      phone: boy.phone,
      email: boy.email,
      vehicleNumber: boy.vehicleNumber,
      status: boy.status
    });
    setEditingBoy(boy);
    setShowAddForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this delivery boy?")) {
      setDeliveryBoys(prev => prev.filter(boy => boy.id !== id));
      alert("Delivery boy deleted successfully!");
    }
  };

  const filteredBoys = deliveryBoys.filter(boy =>
    boy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    boy.phone.includes(searchTerm) ||
    boy.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: deliveryBoys.length,
    active: deliveryBoys.filter(boy => boy.status === "Active").length,
    inactive: deliveryBoys.filter(boy => boy.status === "Inactive").length
  };

  return (
    <div className="p-2 sm:p-6 bg-red-50 min-h-screen">
      {/* Stats Cards */}
      <div className="mb-4 sm:mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-500">Total Delivery Boys</p>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
                  {stats.total}
                </h3>
              </div>
              <div className="p-2 sm:p-3 bg-blue-100 rounded-full">
                <FaUser className="text-lg sm:text-xl text-blue-500" />
              </div>
            </div>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-500">Active</p>
                <h3 className="text-xl sm:text-2xl font-bold text-green-600">
                  {stats.active}
                </h3>
              </div>
              <div className="p-2 sm:p-3 bg-green-100 rounded-full">
                <FaCheckCircle className="text-lg sm:text-xl text-green-500" />
              </div>
            </div>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-500">Inactive</p>
                <h3 className="text-xl sm:text-2xl font-bold text-red-600">
                  {stats.inactive}
                </h3>
              </div>
              <div className="p-2 sm:p-3 bg-red-100 rounded-full">
                <FaTimesCircle className="text-lg sm:text-xl text-red-500" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Add Section */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search delivery boys..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 shadow rounded-lg focus:outline-none focus:border-red-500"
          />
          <FaSearch className="absolute left-3 top-3.5 text-gray-700" />
        </div>
        <button
          onClick={() => {
            setShowAddForm(true);
            setEditingBoy(null);
            setFormData({
              name: "",
              phone: "",
              email: "",
              vehicleNumber: "",
              status: "Active"
            });
          }}
          className="flex justify-center items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-lg hover:from-red-600 hover:to-red-700 transition-all shadow-md"
        >
          <FaPlus />
          <span>Add Delivery Boy</span>
        </button>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="bg-white rounded-lg shadow p-4 sm:p-6 mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {editingBoy ? "Edit Delivery Boy" : "Add New Delivery Boy"}
          </h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Phone *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Vehicle Number *</label>
              <input
                type="text"
                name="vehicleNumber"
                value={formData.vehicleNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div className="flex gap-4 md:col-span-2">
              <button
                type="submit"
                className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                {editingBoy ? "Update" : "Add"} Delivery Boy
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  setEditingBoy(null);
                }}
                className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Delivery Boys Cards */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-700 text-lg">Delivery Boys ({filteredBoys.length})</h3>
        
        {filteredBoys.map((boy) => (
          <div key={boy.id} className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
                  <FaUser className="text-gray-500 text-xl" />
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium text-gray-900 text-lg">{boy.name}</h4>
                    <p className="text-sm text-gray-500">Joined: {new Date(boy.joinedDate).toLocaleDateString()}</p>
                  </div>
                  <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                    boy.status === "Active" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-red-100 text-red-800"
                  }`}>
                    {boy.status}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                  <div>
                    <div className="text-sm text-gray-600 flex items-center mb-1">
                      <FaPhone className="mr-2 text-gray-400" />
                      {boy.phone}
                    </div>
                    {boy.email && (
                      <div className="text-sm text-gray-600">{boy.email}</div>
                    )}
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 flex items-center mb-1">
                      <FaMotorcycle className="mr-2 text-gray-400" />
                      {boy.vehicleNumber}
                    </div>
                    <div className="text-sm text-gray-600">
                      {boy.ordersDelivered} orders delivered
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="text-yellow-400 mr-1">⭐</span>
                    <span>Rating: {boy.rating || "N/A"}</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(boy)}
                      className="flex items-center bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-2 rounded-md text-sm transition-colors"
                    >
                      <FaEdit className="mr-1" /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(boy.id)}
                      className="flex items-center bg-red-50 text-red-600 hover:bg-red-100 px-3 py-2 rounded-md text-sm transition-colors"
                    >
                      <FaTrash className="mr-1" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {filteredBoys.length === 0 && (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <FaUser className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No delivery boys found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm ? 'Try adjusting your search terms.' : 'Get started by adding your first delivery boy.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeliveryBoy;