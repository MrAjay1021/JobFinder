/**
 * API utility functions for making requests to the backend
 */

// Base API URL (using proxy in development)
const API_URL = '/api';

/**
 * Set auth token for authenticated requests
 * @param {Object} headers - Request headers
 * @returns {Object} Headers with Authorization token if available
 */
const setAuthToken = (headers = {}) => {
  const token = localStorage.getItem('token');
  
  if (token) {
    return {
      ...headers,
      'Authorization': `Bearer ${token}`
    };
  }
  
  return headers;
};

/**
 * Handle API responses and errors consistently
 * @param {Response} response - Fetch response object
 * @returns {Promise} Resolved with data or rejected with error
 */
const handleResponse = async (response) => {
  const data = await response.json();
  
  if (!response.ok) {
    // Extract the specific error message if available
    const errorMessage = data.error || 
                         (data.errors && data.errors.length > 0 ? data.errors[0].msg : null) ||
                         'API request failed';
    
    console.error('API Error:', data); // Log full error details for debugging
    throw new Error(errorMessage);
  }
  
  return data;
};

/**
 * Login user
 * @param {Object} credentials - User credentials {email, password}
 * @returns {Promise} Auth response with token
 */
export const login = async (credentials) => {
  const response = await fetch(`${API_URL}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });
  
  return handleResponse(response);
};

/**
 * Register user
 * @param {Object} userData - User registration data
 * @returns {Promise} Auth response with token
 */
export const register = async (userData) => {
  const response = await fetch(`${API_URL}/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  
  return handleResponse(response);
};

/**
 * Get current user profile
 * @returns {Promise} User data
 */
export const getCurrentUser = async () => {
  const response = await fetch(`${API_URL}/users/me`, {
    headers: setAuthToken()
  });
  
  return handleResponse(response);
};

/**
 * Get jobs
 * @param {Object} filters - Optional filter parameters
 * @returns {Promise} Array of jobs
 */
export const getJobs = async (filters = {}) => {
  const queryString = new URLSearchParams(filters).toString();
  const url = `${API_URL}/jobs${queryString ? `?${queryString}` : ''}`;
  
  const response = await fetch(url);
  return handleResponse(response);
};

/**
 * Create new job listing
 * @param {Object} jobData - Job listing data
 * @returns {Promise} Created job
 */
export const createJob = async (jobData) => {
  const response = await fetch(`${API_URL}/jobs`, {
    method: 'POST',
    headers: {
      ...setAuthToken(),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(jobData)
  });
  
  return handleResponse(response);
};

/**
 * Apply for a job
 * @param {String} jobId - ID of job to apply for
 * @param {Object} applicationData - Application data
 * @returns {Promise} Application response
 */
export const applyForJob = async (jobId, applicationData) => {
  const response = await fetch(`${API_URL}/applications`, {
    method: 'POST',
    headers: {
      ...setAuthToken(),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      job: jobId,
      ...applicationData
    })
  });
  
  return handleResponse(response);
};

/**
 * Get user's job applications
 * @returns {Promise} Array of applications
 */
export const getUserApplications = async () => {
  const response = await fetch(`${API_URL}/applications/me`, {
    headers: setAuthToken()
  });
  
  return handleResponse(response);
};

export default {
  login,
  register,
  getCurrentUser,
  getJobs,
  createJob,
  applyForJob,
  getUserApplications
}; 