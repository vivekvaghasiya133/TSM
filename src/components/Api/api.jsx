import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

// Create axios instance with default config
const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to add auth token
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

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      localStorage.setItem('isAuthenticated', 'false');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth endpoints
export const login = async (credentials) => {
  try {
    const response = await api.post('/admin/login', credentials);
    if (response.data.success) {
      toast.success(response.data.message);
    }
    return response;
  } catch (error) {
    toast.error(error.response?.data?.message || 'Login failed');
    throw error;
  }
};

export const getSociety = async() => {
  try {
    const response = await api.get('/society');
    console.log(response);
    
    return response;
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to add society');
    throw error;
  }
};



export const addSociety = async (societyData) => {
  try {
    const response = await api.post('/society', societyData);
    console.log(response);
    
    if (response.data.success) {
      toast.success(response.data.message);
    }
    return response;
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to add society');
    throw error;
  }
};

// User endpoints
export const updateSociety = async (societyId, societyData) => {
  try {
    const response = await api.put(`/society/${societyId}`, societyData);
    console.log(response);
    if (response.data.success) {
      toast.success(response.data.message);
    }
    return response;
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to update society');
    throw error;
  }
};

export const addStudent = async (studentData) => {
  try {
    const response = await api.post('/student', studentData);
    console.log(response);
    
    if (response.data.success) {
      toast.success(response.data.message);
    }
    return response;
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to add student');
    throw error;
  }


};
export const getStudent = async () => {
  try {
    const response = await api.get('/student');
    console.log(response);
    return response;
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to get student');
    throw error;
  }
};




export default api;

