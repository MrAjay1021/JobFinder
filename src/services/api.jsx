import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    
    // Debug token usage
    console.log(`API Request to ${config.url}:`, { 
      hasToken: !!token,
      tokenPreview: token ? `${token.substring(0, 10)}...` : 'none'
    });
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log(`API Response from ${response.config.url}:`, {
      status: response.status,
      dataSize: JSON.stringify(response.data).length
    });
    return response;
  },
  (error) => {
    console.error('API Error:', {
      url: error.config?.url,
      status: error.response?.status,
      message: error.response?.data?.message || error.message
    });
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/users/login', credentials),
  register: (userData) => api.post('/users/register', userData),
  getProfile: () => api.get('/users/profile'),
  updateProfile: (profileData) => api.put('/users/profile', profileData),
};

// Jobs API
export const jobsAPI = {
  getAllJobs: (filters) => api.get('/jobs', { params: filters }),
  getUserJobs: () => api.get('/jobs/user'),
  getJobById: (id) => api.get(`/jobs/${id}`),
  createJob: (jobData) => api.post('/jobs', jobData),
  updateJob: (id, jobData) => api.put(`/jobs/${id}`, jobData),
  deleteJob: (id) => api.delete(`/jobs/${id}`),
};

// Applications API
export const applicationsAPI = {
  submitApplication: (applicationData) => api.post('/applications', applicationData),
  getMyApplications: () => api.get('/applications'),
  getApplicationById: (id) => api.get(`/applications/${id}`),
  updateApplicationStatus: (id, status) => api.put(`/applications/${id}/status`, { status }),
};

export default api; 