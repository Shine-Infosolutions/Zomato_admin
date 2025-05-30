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
  const handleLogout = async () => {
    // Show confirm dialog first
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (!confirmLogout) return; // If Cancel, do nothing

    try {
      const res = await fetch(
        "https://hotelbuddhaavenue.vercel.app/api/admin/adminlogout",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      let data = {};
      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      }

      if (res.ok) {
        // Proceed with logout
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        navigate("/admin", { replace: true });
      } else {
        alert(data.message || "Logout failed. Please try again.");
      }
    } catch (err) {
      alert("Logout failed. Please try again.");
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
      {/* Sidebar */}
      <div
        className={`bg-red-700 text-white ${
          sidebarOpen ? "w-64" : "w-16"
        } transition-all duration-300 ease-in-out fixed h-full z-10`}
      >
        <div className="p-4 flex justify-between items-center">
          {sidebarOpen && <span className="font-bold text-lg">Dashboard</span>}
          <button
            onClick={toggleSidebar}
            className={`p-2 rounded-md hover:bg-red-800 ${
              !sidebarOpen && "mx-auto"
            }`}
          >
            {sidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        <ul>
          <li className="mb-2">
            <div className="relative">
              <button
                onClick={() => setOrderDropdownOpen(!orderDropdownOpen)}
                className="w-full flex items-center p-3 hover:bg-red-800 rounded-md"
              >
                <FaShoppingBag className="text-xl" />
                {sidebarOpen && (
                  <>
                    <Link
                      to="/dashboard/order"
                      className="flex items-center p-2 hover:bg-red-800 rounded-md"
                    >
                      <span className="ml-4">Order Management</span>
                    </Link>
                    <FaAngleDown
                      className={`ml-auto transition-transform ${
                        orderDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </>
                )}
              </button>
              {sidebarOpen && !orderDropdownOpen && (
                <ul className="pl-8">
                  <li>
                    <Link
                      to="/dashboard/category"
                      className="flex items-center p-2 hover:bg-red-800 rounded-md"
                    >
                      <BiSolidCategory className="text-xl" />
                      <span className="ml-4">Category</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/items"
                      className="flex items-center p-2 hover:bg-red-800 rounded-md"
                    >
                      <FaSitemap className="text-xl" />
                      <span className="ml-4">Items</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/variation"
                      className="flex items-center p-2 hover:bg-red-800 rounded-md"
                    >
                      <LuSplit className="text-xl" />
                      <span className="ml-4">Variation</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/add-on"
                      className="flex items-center p-2 hover:bg-red-800 rounded-md"
                    >
                      <MdLibraryAdd className="text-xl" />
                      <span className="ml-4">Add On</span>
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          </li>
          <li className="mb-2">
            <Link
              to="/dashboard/settings"
              className="flex items-center p-3 hover:bg-red-800 rounded-md"
            >
              <FaCog className="text-xl" />
              {sidebarOpen && <span className="ml-4">Settings</span>}
            </Link>
          </li>
        </ul>
      </div>

      {/* Main content */}
      <div
        className={`flex-1 ${
          sidebarOpen ? "ml-16 md:ml-64" : "ml-16"
        } transition-all duration-300 ease-in-out`}
      >
        <header className="flex justify-between items-center p-3 md:p-6 bg-white shadow">
          <h1 className="text-lg md:text-xl font-bold text-red-500">
            {getPageTitle()}
          </h1>
          <div className="flex items-center gap-2 md:gap-4">
            <span className="text-sm md:text-base text-gray-600 hidden sm:inline">
              {user?.email}
            </span>
            <button
              onClick={handleLogout}
              className=" border-gray-300 shadow text-red-500 px-2 md:px-4 py-1 md:py-2 text-sm md:text-base rounded hover:bg-red-500 hover:text-white transition-colors"
            >
              Logout
            </button>
          </div>
        </header>
        <div className="p-0 sm:p-6">
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
