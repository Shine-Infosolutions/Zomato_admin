// src/AdminPanel/Admin.jsx
import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import photoImg from "../assets/photo.jpeg";
// import Register from "../context/Register";
import Dashboard from "../context/Dashboard";

const Login = ({ switchToRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { error, login } = useAppContext();

  const handleLogin = (e) => {
    e.preventDefault();
    login(email, password);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 bg-opacity-90">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-red-500 mb-2">Admin Panel</h1>
      </div>

      <form className="space-y-6" onSubmit={handleLogin}>
        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-md text-center text-sm">
            {error}
          </div>
        )}

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Admin Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Admin Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
        >
          Login
        </button>

        {/* <div className="text-center mt-4 flex justify-between">
          <a href="#" className="text-sm text-red-500 hover:underline">
            Forgot Password?
          </a>
          <button
            type="button"
            onClick={switchToRegister}
            className="text-sm text-red-500 hover:underline"
          >
            Create Account
          </button>
        </div> */}
      </form>
    </div>
  );
};

const Admin = () => {
  const [showRegister, setShowRegister] = useState(false);
  const { isLoggedIn } = useAppContext();

  if (isLoggedIn) {
    return <Dashboard />;
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage: `url(${photoImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {showRegister ? (
        <Register switchToLogin={() => setShowRegister(false)} />
      ) : (
        <Login switchToRegister={() => setShowRegister(true)} />
      )}
    </div>
  );
};

export default Admin;
