import React, { useState } from "react";
import { useAppContext } from "./AppContext";
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

const Dashboard = () => {
  const { logout, user } = useAppContext();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div
        className={`bg-red-700 text-white ${
          sidebarOpen ? "w-64" : "w-16"
        } transition-all duration-300 ease-in-out fixed h-full`}
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
        <nav className="mt-8">
          <ul>
            <li className="mb-2">
              <a
                href="#"
                className="flex items-center p-3 hover:bg-red-800 rounded-md"
              >
                <BiSolidCategory className="text-xl" />
                {sidebarOpen && <span className="ml-4">Category </span>}
              </a>
            </li>
            <li className="mb-2">
              <a
                href="#"
                className="flex items-center p-3 hover:bg-red-800 rounded-md"
              >
                <FaSitemap className="text-xl" />
                {sidebarOpen && <span className="ml-4">Items</span>}
              </a>
            </li>
            <li className="mb-2">
              <a
                href="#"
                className="flex items-center p-3 hover:bg-red-800 rounded-md"
              >
                <LuSplit className="text-xl" />
                {sidebarOpen && <span className="ml-4">Variation </span>}
              </a>
            </li>
            <li className="mb-2">
              <a
                href="#"
                className="flex items-center p-3 hover:bg-red-800 rounded-md"
              >
                <MdLibraryAdd className="text-xl" />
                {sidebarOpen && <span className="ml-4">Add New</span>}
              </a>
            </li>
            <li className="mb-2">
              <a
                href="#"
                className="flex items-center p-3 hover:bg-red-800 rounded-md"
              >
                <FaCog className="text-xl" />
                {sidebarOpen && <span className="ml-4">Settings</span>}
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div
        className={`flex-1 ${
          sidebarOpen ? "ml-64" : "ml-16"
        } transition-all duration-300 ease-in-out`}
      >
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-red-500"></h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">{user?.email}</span>
            <button
              onClick={logout}
              className="border border-red-500 text-red-500 px-4 py-2 rounded hover:bg-red-500 hover:text-white transition-colors"
            >
              Logout
            </button>
          </div>
        </header>

        {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h2 className="text-2xl font-bold text-gray-800">
            Welcome to Admin Panel
          </h2>
          <p className="mt-2 text-gray-600">
            Select an option from the menu to manage your data.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <h3 className="text-gray-600 text-lg">Products</h3>
              <p className="text-3xl font-bold text-red-500 mt-2">245</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <h3 className="text-gray-600 text-lg">Orders Today</h3>
              <p className="text-3xl font-bold text-red-500 mt-2">1,234</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <h3 className="text-gray-600 text-lg">Active Users</h3>
              <p className="text-3xl font-bold text-red-500 mt-2">5,678</p>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
