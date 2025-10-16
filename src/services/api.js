const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchAllOrders = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/order/get`, {
      //const response = await fetch(`http://localhost:5000/api/order/getall`, {
    method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });

    const data = await response.json();
    
    if (data.success) {
      return { success: true, orders: data.orders || [] };
    } else {
      return { success: false, error: data.message || 'Failed to fetch orders' };
    }
  } catch (error) {
    console.error('Error fetching orders:', error);
    return { success: false, error: 'Error connecting to server' };
  }
};

export const updateOrderStatus = async (orderId, status) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/order/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ orderId, status }),
    });

    const data = await response.json();
    return { success: response.ok, data };
  } catch (error) {
    console.error('Error updating order status:', error);
    return { success: false, error: error.message };
  }
};

export const getUserAddresses = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/user/getaddress`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    });
    const data = await response.json();
    return { success: response.ok, data: data.addresses || [] };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const fetchCategories = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/category/get`);
    const data = await response.json();
    return { success: response.ok, categories: data.categories || [] };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const addCategory = async (categoryData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/category/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(categoryData),
    });
    const data = await response.json();
    return { success: response.ok, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const updateCategory = async (id, categoryData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/category/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(categoryData),
    });
    const data = await response.json();
    return { success: response.ok, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const deleteCategory = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/category/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return { success: response.ok, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const fetchAddons = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/addon/get`);
    const data = await response.json();
    return { success: response.ok, addons: data.addons || [] };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const addAddon = async (addonData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/addon/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(addonData),
    });
    const data = await response.json();
    return { success: response.ok, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const updateAddon = async (id, addonData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/addon/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(addonData),
    });
    const data = await response.json();
    return { success: response.ok, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const deleteAddon = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/addon/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return { success: response.ok, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const fetchVariations = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/variation/get`);
    const data = await response.json();
    return { success: response.ok, variations: data.variations || [] };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const addVariation = async (variationData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/variation/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(variationData),
    });
    const data = await response.json();
    return { success: response.ok, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const updateVariation = async (id, variationData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/variation/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(variationData),
    });
    const data = await response.json();
    return { success: response.ok, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const deleteVariation = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/variation/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return { success: response.ok, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};