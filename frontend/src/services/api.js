import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`🚀 ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('❌ API Error:', error.response?.data || error.message);
    return Promise.reject(error.response?.data || { message: error.message });
  }
);

// API methods
export const subjectsAPI = {
  getAll: () => api.get('/subjects'),
  create: (data) => api.post('/subjects', data),
  update: (id, data) => api.put(`/subjects/${id}`, data),
  delete: (id) => api.delete(`/subjects/${id}`),
};

export const attendanceAPI = {
  getStats: () => api.get('/attendance/stats'),
  getBySubject: (id) => api.get(`/attendance/subject/${id}`),
  mark: (data) => api.post('/attendance', data),
  update: (id, data) => api.put(`/attendance/${id}`, data),
};

export const timetableAPI = {
  getAll: () => api.get('/timetable'),
  getToday: () => api.get('/timetable/today'),
  create: (data) => api.post('/timetable', data),
};

export default api;