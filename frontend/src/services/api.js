import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_BASE = `${BACKEND_URL}/api`;

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor for logging
apiClient.interceptors.request.use((config) => {
  console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
  return config;
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Articles API
export const articlesAPI = {
  getAll: (params = {}) => {
    return apiClient.get('/articles', { params });
  },
  
  getById: (id) => {
    return apiClient.get(`/articles/${id}`);
  },
  
  like: (id) => {
    return apiClient.post(`/articles/${id}/like`);
  },
  
  create: (articleData) => {
    return apiClient.post('/articles', articleData);
  }
};

// Comments API
export const commentsAPI = {
  getByArticle: (articleId) => {
    return apiClient.get(`/articles/${articleId}/comments`);
  },
  
  create: (articleId, commentData) => {
    return apiClient.post(`/articles/${articleId}/comments`, commentData);
  },
  
  like: (commentId) => {
    return apiClient.post(`/comments/${commentId}/like`);
  }
};

// CIEL Info API
export const cielAPI = {
  getInfo: () => {
    return apiClient.get('/ciel-info');
  }
};

// Formations API
export const formationsAPI = {
  getAll: () => {
    return apiClient.get('/formations');
  },
  
  getByLevel: (level) => {
    return apiClient.get(`/formations/${level}`);
  }
};

// Health check
export const healthAPI = {
  check: () => {
    return apiClient.get('/health');
  }
};

export default apiClient;