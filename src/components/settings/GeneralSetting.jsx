// src/components/settings/GeneralSettings.jsx
import React, { useState } from "react";
import { FaSave, FaImage } from "react-icons/fa";

const GeneralSettings = () => {
  const [settings, setSettings] = useState({
    restaurantName: "Shine Restaurant",
    tagline: "Delicious food, delivered fast",
    logo: null,
    logoPreview: "/logo.png",
    currency: "INR",
    taxRate: "5",
    timeZone: "Asia/Kolkata",
  });

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSettings({
        ...settings,
        logo: file,
      });

      const reader = new FileReader();
      reader.onloadend = () => {
        setSettings((prev) => ({
          ...prev,
          logoPreview: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("General settings saved successfully!");
    console.log("General settings saved:", settings);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold mb-4">General Settings</h2>

      {/* <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">
          Restaurant Logo
        </label>
        <div className="flex items-center">
          <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100 mr-4">
            {settings.logoPreview && (
              <img
                src={settings.logoPreview}
                alt="Logo Preview"
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div>
            <input
              type="file"
              id="logo"
              accept="image/*"
              onChange={handleLogoChange}
              className="hidden"
            />
            <label
              htmlFor="logo"
              className="cursor-pointer inline-block bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <FaImage className="inline mr-2" />
              Choose Logo
            </label>
            <p className="text-xs text-gray-500 mt-1">
              Recommended size: 512x512 pixels
            </p>
          </div>
        </div>
      </div> */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label
            htmlFor="restaurantName"
            className="block text-gray-700 font-medium mb-2"
          >
            Restaurant Name
          </label>
          <input
            type="text"
            id="restaurantName"
            name="restaurantName"
            value={settings.restaurantName}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label
            htmlFor="tagline"
            className="block text-gray-700 font-medium mb-2"
          >
            Tagline
          </label>
          <input
            type="text"
            id="tagline"
            name="tagline"
            value={settings.tagline}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>

        <div>
          <label
            htmlFor="currency"
            className="block text-gray-700 font-medium mb-2"
          >
            Currency
          </label>
          <select
            id="currency"
            name="currency"
            value={settings.currency}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            <option value="INR">Indian Rupee (₹)</option>
            {/* <option value="USD">US Dollar ($)</option>
            <option value="EUR">Euro (€)</option>
            <option value="GBP">British Pound (£)</option> */}
          </select>
        </div>

        <div>
          <label
            htmlFor="taxRate"
            className="block text-gray-700 font-medium mb-2"
          >
            Default Tax Rate (%)
          </label>
          <input
            type="number"
            id="taxRate"
            name="taxRate"
            value={settings.taxRate}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            min="0"
            max="100"
            step="0.01"
          />
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4 mt-6 flex justify-end">
        <button
          type="submit"
          className="flex justify-center items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-lg hover:from-red-600 hover:to-red-700 transition-all shadow-sm"
        >
          <FaSave />
          <span>Save Settings</span>
        </button>
      </div>
    </form>
  );
};

export default GeneralSettings;
