// src/components/Settings.jsx
import React, { useState } from "react";
import { FaStore, FaMapMarkerAlt, FaCreditCard, FaBell } from "react-icons/fa";
import GeneralSettings from "./settings/GeneralSetting";
// import ContactSettings from "./settings/ContactSettings";
// import PaymentSettings from "./settings/PaymentSettings";
// import NotificationSettings from "./settings/NotificationSettings";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("general");

  const tabs = [
    { id: "general", label: "General", icon: <FaStore /> },
    { id: "contact", label: "Contact", icon: <FaMapMarkerAlt /> },
    { id: "payment", label: "Payment", icon: <FaCreditCard /> },
    { id: "notification", label: "Notifications", icon: <FaBell /> },
  ];

  return (
    <div className="p-2 sm:p-6 bg-red-50">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Settings</h1>
        <p className="text-gray-600">Configure your restaurant settings</p>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex flex-col sm:flex-row">
          {/* Sidebar */}
          <div className="sm:w-64 bg-gray-50 border-r border-gray-200">
            <div className="p-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center w-full px-4 py-3 mb-2 rounded-lg text-left transition-colors ${
                    activeTab === tab.id
                      ? "bg-red-100 text-red-700"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <span className="mr-3">{tab.icon}</span>
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-6">
            {activeTab === "general" && <GeneralSettings />}
            {activeTab === "contact" && <ContactSettings />}
            {activeTab === "payment" && <PaymentSettings />}
            {activeTab === "notification" && <NotificationSettings />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
