import axios from 'axios';

// Use environment variable for API URL (required in production)
const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  console.error('⚠️ Warning: VITE_API_URL is not set. API calls may fail.');
  // Don't create axios instance without API URL in production
}

// Create axios instance
const api = axios.create({
  baseURL: API_URL || '/api', // Fallback to relative path if not set
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (email, password) => api.post('/admin/login', { email, password }),
};

// Category API
export const categoryAPI = {
  getAll: () => api.get('/categories'),
  create: (name) => api.post('/categories', { name }),
  update: (id, name) => api.put(`/categories/${id}`, { name }),
  delete: (id) => api.delete(`/categories/${id}`),
};

// Blog API
export const blogAPI = {
  getAll: (params) => api.get('/blogs', { params }),
  getBySlug: (slug) => api.get(`/blogs/${slug}`),
  create: (formData) => api.post('/blogs', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  update: (id, formData) => api.put(`/blogs/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  delete: (id) => api.delete(`/blogs/${id}`),
  getStats: () => api.get('/blogs/stats'),
};

// Website Content API
export const websiteContentAPI = {
  getAll: () => api.get('/website-content'),
  getSection: (sectionName) => api.get(`/website-content/${sectionName}`),
  update: (sectionName, content) => api.put('/website-content', { section_name: sectionName, content }),
};

export default api;

