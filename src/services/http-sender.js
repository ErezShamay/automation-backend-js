import axios from('axios');

// Create an Axios instance
const httpSender = axios.create({
  baseURL: process.env.API_BASE_URL || 'https://example.com/api', // Default API base URL
  timeout: 10000, // Request timeout in milliseconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor
httpSender.interceptors.request.use(
  (config) => {
    // Add Authorization token if available
    const token = process.env.API_TOKEN || '';
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(`[HTTP] Request: ${config.method.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
httpSender.interceptors.response.use(
  (response) => {
    console.log(`[HTTP] Response: ${response.status} ${response.config.url}`);
    return response.data;
  },
  (error) => {
    console.error('[HTTP] Error:', error.response?.status, error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// REST Assure Functions
const restAssure = {
  get: async (url, params = {}, headers = {}) => {
    return httpSender.get(url, { params, headers });
  },

  post: async (url, data = {}, headers = {}) => {
    return httpSender.post(url, data, { headers });
  },

  put: async (url, data = {}, headers = {}) => {
    return httpSender.put(url, data, { headers });
  },

  delete: async (url, params = {}, headers = {}) => {
    return httpSender.delete(url, { params, headers });
  },

  patch: async (url, data = {}, headers = {}) => {
    return httpSender.patch(url, data, { headers });
  },

  head: async (url, params = {}, headers = {}) => {
    return httpSender.head(url, { params, headers });
  },

  options: async (url, params = {}, headers = {}) => {
    return httpSender.options(url, { params, headers });
  },
};

module.exports = restAssure;
