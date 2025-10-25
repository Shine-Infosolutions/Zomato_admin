import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

import Admin from './components/Admin';
import Dashboard from './components/Dashboard';
import Category from './components/Category';
import AddCategory from './components/AddCategory';
import Items from './components/Items';
import AddItem from './components/AddItem';
import Variation from './components/Variation';
import AddVariation from './components/AddVariation';
import AddOnPage from './components/AddOnPage';
import AddOn from './components/AddOn';
import OrderManagement from './components/OrderManagement';
import Settings from './components/Settings';
import DeliveryBoy from './components/DeliveryBoy';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Navigate to="/admin" replace />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/dashboard" element={<Dashboard />}>
              <Route index element={<Navigate to="category" replace />} />
              <Route path="category" element={<Category />} />
              <Route path="add-category" element={<AddCategory />} />
              <Route path="items" element={<Items />} />
              <Route path="add-item" element={<AddItem />} />
              <Route path="variation" element={<Variation />} />
              <Route path="add-variation" element={<AddVariation />} />
              <Route path="add-on" element={<AddOnPage />} />
              <Route path="add-addon" element={<AddOn />} />
              <Route path="order" element={<OrderManagement />} />
              <Route path="delivery-boy" element={<DeliveryBoy />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
