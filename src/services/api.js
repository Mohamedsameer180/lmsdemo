import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to add JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const organizationAPI = {
  getSettings: async () => {
    const response = await api.get('/organization/settings');
    return response.data;
  },
  
  updateSettings: async (settings) => {
    const response = await api.put('/organization/settings', settings);
    return response.data;
  },
  
  uploadLogo: async (file) => {
    const formData = new FormData();
    formData.append('logo', file);
    const response = await api.post('/organization/logo', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },
  
  getLogoUrl: (filename) => `${API_URL}/organization/logo/${filename}`
};

export default api;