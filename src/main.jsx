// src/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Admin from "./context/Admin.jsx";
import { AppProvider } from "./context/AppContext.jsx";
import Dashboard from "./context/Dashboard";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppProvider>
      {/* <App /> */}
      <Admin />
      {/* <Dashboard /> */}
    </AppProvider>
  </StrictMode>
);
