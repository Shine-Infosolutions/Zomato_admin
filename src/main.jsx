import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext.jsx";
import Admin from "./components/Admin.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Category from "./components/Category.jsx";
import AddCategory from "./components/AddCategory.jsx";
import Items from "./components/Items.jsx";
import AddItem from "./components/AddItem.jsx";
import Variation from "./components/Variation.jsx";
import AddVariation from "./components/AddVariation.jsx";
import AddOn from "./components/AddOn.jsx";
import DeliveryBoy from "./components/DeliveryBoy.jsx";
import DineInDetails from "./components/ordersmangement/DineInDetails.jsx";
import OnlineDetails from "./components/ordersmangement/OnlineDetails.jsx";
import MainDeatil from "./components/ordersmangement/MainDeatil.jsx";
import AddOnPage from "./components/AddOnPage.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route path="/dashboard" element={<Dashboard />}>
            {/* <Route path="order" element={<OrderManagement />} /> */}

            <Route path="category" element={<Category />} />
            <Route path="add-category" element={<AddCategory />} />
            <Route path="items" element={<Items />} />
            <Route path="add-item" element={<AddItem />} />
            <Route path="variation" element={<Variation />} />
            <Route path="add-variation" element={<AddVariation />} />
            <Route path="add-on" element={<AddOnPage />} />
            <Route path="add-add-on" element={<AddOn />} />
            {/* <Route path="add-new" element={<AddNew />} /> */}
            {/* <Route path="settings" element={<Settings />} /> */}
            <Route path="*" element={<div>Welcome to the Dashboard!</div>} />
          </Route>
          <Route path="/delivery" element={<DeliveryBoy />} />
          <Route>
            <Route path="/order-management" element={<MainDeatil />} />
            <Route
              path="/order-management/dine-in-orders"
              element={<DineInDetails />}
            />
            <Route
              path="/order-management/online-orders"
              element={<OnlineDetails />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  </StrictMode>
);
