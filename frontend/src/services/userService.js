import axios from 'axios';

const API_URL = '/api/users';

// Update user profile
export const updateUserProfile = async (userData) => {
  try {
    const response = await axios.put(`${API_URL}/update-profile`, userData, {
      withCredentials: true, // Ensures cookies (JWT) are sent
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, error: 'Server error' };
  }
};

// Get user details by ID
export const getUserById = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/${userId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, error: 'User not found' };
  }
};
