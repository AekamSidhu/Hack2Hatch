import api from './api';

// ✅ Register user
export const register = async (userData) => {
  try {
    const response = await api.post('/api/auth/register', {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      role: userData.isMentor ? "mentor" : "mentee",
    });
    return response.data;
  } catch (error) {
    console.error("❌ Registration Error:", error.response?.data || error.message);
    throw error.response?.data || { error: "Registration failed" };
  }
};

// ✅ Login user
export const login = async (email, password) => {
  try {
    const response = await api.post('/api/auth/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      api.defaults.headers.Authorization = `Bearer ${response.data.token}`; // ✅ Set token in API headers
    }
    return response.data;
  } catch (error) {
    console.error("❌ Login Error:", error.response?.data || error.message);
    throw error.response?.data || { error: "Login failed" };
  }
};

// ✅ Logout user
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  delete api.defaults.headers.Authorization;
};

// ✅ Get current user
export const getCurrentUser = async () => {
  try {
    const response = await api.get('/api/auth/me'); // ✅ Requires new backend route
    return response.data;
  } catch (error) {
    console.error("❌ Fetching Current User Error:", error.response?.data || error.message);
    throw error.response?.data || { error: "Failed to fetch user" };
  }
};

// ✅ Check if user is authenticated
export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};
