// src/context/AppContext.jsx
import React, { createContext, useState, useContext } from "react";

// Create the context
const AppContext = createContext();

// Create a provider component
export const AppProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [users, setUsers] = useState([
    { email: "admin@example.com", password: "admin123" },
  ]);

  // Login function
  const login = (email, password) => {
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      setUser({ email: user.email });
      setIsLoggedIn(true);
      setError("");
      return true;
    } else {
      setError("Invalid email or password");
      return false;
    }
  };

  // Register function
  const register = (email, password) => {
    // Check if email already exists
    if (users.some((user) => user.email === email)) {
      setError("Email already exists");
      return false;
    }

    // Add new user
    setUsers([...users, { email, password }]);
    setUser({ email });
    setIsLoggedIn(true);
    setError("");
    return true;
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  // Values to be provided to consumers
  const contextValue = {
    isLoggedIn,
    user,
    error,
    users,
    login,
    logout,
    register,
    setError,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

// Custom hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
