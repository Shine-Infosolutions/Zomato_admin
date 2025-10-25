import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Link } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaUsers,
  FaShoppingCart,
  FaCog,
  FaSitemap,
} from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { LuSplit } from "react-icons/lu";
import { MdLibraryAdd } from "react-icons/md";
import { FaShoppingBag, FaAngleDown } from "react-icons/fa";
import Category from "./Category";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import AddCategory from "./AddCategory";


const Dashboard = () => {
  const { logout, user } = useAppContext();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [orderDropdownOpen, setOrderDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Replace your handleLogout function with this:
  const handleLogout = async () => {
    // Show confirm dialog first
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (!confirmLogout) return; // If Cancel, do nothing

    try {
      // Call the API to logout on the server
      const res = await fetch(
        "https://hotelbuddhaavenue.vercel.app/api/admin/adminlogout",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );

      // Always perform local logout regardless of API response
      logout(); // This uses the context's logout function

      // Navigate to login page
      navigate("/admin", { replace: true });
    } catch (err) {
      console.error("Logout error:", err);
      // Still perform local logout even if API call fails
      logout();
      navigate("/admin", { replace: true });
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Create a function to get the page title
  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes("/category")) return "Category Management";
    if (path.includes("/add-category")) return "Category Management";
    if (path.includes("/items")) return "Items Management";
    if (path.includes("/add-item")) return "Items Management";
    if (path.includes("/variation")) return "Variation Management";
    if (path.includes("/add-variation")) return "Variation Management";

    if (path.includes("/add-new")) return "Add New";
    if (path.includes("/settings")) return "Settings";
    return "Dashboard";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div
        className={`bg-red-700 text-white transition-all duration-300 ease-in-out fixed h-full z-30 ${
          sidebarOpen 
            ? "w-64" 
            : "w-12 lg:w-12 -translate-x-full lg:translate-x-0"
        } ${sidebarOpen ? "translate-x-0" : ""}`}
      >
        <div className={`${sidebarOpen ? 'p-4 flex justify-between items-center' : ''}`}>
          {sidebarOpen && <span className="font-bold text-lg">Dashboard</span>}
          <button
            onClick={toggleSidebar}
            className={`${sidebarOpen ? 'p-2 rounded-md hover:bg-red-800' : 'flex items-center p-3 hover:bg-red-800 rounded-md w-full'}`}
          >
            {sidebarOpen ? <FaTimes className="text-lg" /> : <FaBars className="text-xl" />}
          </button>
        </div>
        <ul>
          <li className="mb-2">
            <Link
              to="/dashboard/order"
              className="flex items-center p-3 hover:bg-red-800 rounded-md"
              onClick={() => setSidebarOpen(false)}
            >
              <FaShoppingBag className="text-xl" />
              {sidebarOpen && <span className="ml-4">Orders</span>}
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/dashboard/category"
              className="flex items-center p-3 hover:bg-red-800 rounded-md"
              onClick={() => setSidebarOpen(false)}
            >
              <BiSolidCategory className="text-xl" />
              {sidebarOpen && <span className="ml-4">Category</span>}
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/dashboard/items"
              className="flex items-center p-3 hover:bg-red-800 rounded-md"
              onClick={() => setSidebarOpen(false)}
            >
              <FaSitemap className="text-xl" />
              {sidebarOpen && <span className="ml-4">Items</span>}
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/dashboard/variation"
              className="flex items-center p-3 hover:bg-red-800 rounded-md"
              onClick={() => setSidebarOpen(false)}
            >
              <LuSplit className="text-xl" />
              {sidebarOpen && <span className="ml-4">Variation</span>}
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/dashboard/add-on"
              className="flex items-center p-3 hover:bg-red-800 rounded-md"
              onClick={() => setSidebarOpen(false)}
            >
              <MdLibraryAdd className="text-xl" />
              {sidebarOpen && <span className="ml-4">Add On</span>}
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/dashboard/delivery-boy"
              className="flex items-center p-3 hover:bg-red-800 rounded-md"
              onClick={() => setSidebarOpen(false)}
            >
              <FaUsers className="text-xl" />
              {sidebarOpen && <span className="ml-4">Delivery Boys</span>}
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/dashboard/settings"
              className="flex items-center p-3 hover:bg-red-800 rounded-md"
              onClick={() => setSidebarOpen(false)}
            >
              <FaCog className="text-xl" />
              {sidebarOpen && <span className="ml-4">Settings</span>}
            </Link>
          </li>
        </ul>
      </div>

      {/* Main content */}
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          sidebarOpen 
            ? "lg:ml-64 ml-0" 
            : "lg:ml-12 ml-0"
        }`}
      >
        <header className="flex justify-between items-center p-3 md:p-6 bg-white shadow">
          <div className="flex items-center gap-3">
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-2 rounded-md text-red-500 hover:bg-red-50"
            >
              <FaBars className="text-xl" />
            </button>
            <h1 className="text-lg md:text-xl font-bold text-red-500">
              {getPageTitle()}
            </h1>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <span className="text-sm md:text-base text-gray-600 hidden sm:inline">
              {user?.email}
            </span>
            <button
              onClick={handleLogout}
              className="border-gray-300 shadow text-red-500 px-2 md:px-4 py-1 md:py-2 text-sm md:text-base rounded hover:bg-red-500 hover:text-white transition-colors"
            >
              Logout
            </button>
          </div>
        </header>
        <div className="p-3 sm:p-6">
          <Outlet />
        </div>
      </div>
      

    </div>
  );
};

// Placeholder components
// const DashboardHome = () => (
//   <div className="p-6">
//     <h2 className="text-2xl font-bold text-gray-800">Welcome to Admin Panel</h2>
//   </div>
// );
// const Items = () => <div className="p-6">Items Page</div>;
// const Variation = () => <div className="p-6">Variation Page</div>;
// const Settings = () => <div className="p-6">Settings Page</div>;

export default Dashboard;
