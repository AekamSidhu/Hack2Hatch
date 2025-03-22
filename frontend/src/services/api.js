import axios from "axios";

// Create axios instance with correct backend URL
const api = axios.create({
  baseURL: "http://localhost:5000/api", // Update this if your backend runs on a different port
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to attach auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
