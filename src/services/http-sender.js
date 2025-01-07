import axios from 'axios';

// Create an Axios instance
const httpSender = axios.create({
  baseURL: process.env.API_BASE_URL, // Base URL from environment variables
  timeout: 10000,                   // Request timeout in milliseconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor
httpSender.interceptors.request.use(
  (config) => {
    // Modify request (e.g., add auth token)
    const token = process.env.API_TOKEN || ''; // Use token from environment
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error) // Handle request errors
);

// Response Interceptor
httpSender.interceptors.response.use(
  (response) => response.data, // Simplify response
  (error) => {
    // Handle errors globally
    console.error('HTTP Error:', error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

module.exports = httpSender;
