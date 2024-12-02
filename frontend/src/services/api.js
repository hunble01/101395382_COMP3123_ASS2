import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5001', // Use environment variable for baseURL
});

// Add an interceptor to set the Authorization header
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

// Example: Get all employees
export const getEmployees = async () => {
  try {
    const response = await api.get('/api/employees');
    return response.data;
  } catch (error) {
    console.error("Error fetching employees:", error.response?.data?.message || error.message);
    throw error;
  }
};

// Example: Sign up a new user
export const signUp = async (userData) => {
  try {
    const response = await api.post('/api/auth/signup', userData);
    return response.data;
  } catch (error) {
    console.error("Error signing up:", error.response?.data?.message || error.message);
    throw error;
  }
};

// Example: Log in a user
export const login = async (loginData) => {
  try {
    const response = await api.post('/api/auth/login', loginData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error.response?.data?.message || error.message);
    throw error;
  }
};

// Example: Add an employee
export const addEmployee = async (employeeData) => {
  try {
    const response = await api.post('/api/employees', employeeData);
    return response.data;
  } catch (error) {
    console.error("Error adding employee:", error.response?.data?.message || error.message);
    throw error;
  }
};

// Example: Get employee details
export const getEmployeeDetails = async (id) => {
  try {
    const response = await api.get(`/api/employees/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching employee details:", error.response?.data?.message || error.message);
    throw error;
  }
};

// Example: Update an employee
export const updateEmployee = async (id, employeeData) => {
  try {
    const response = await api.put(`/api/employees/${id}`, employeeData);
    return response.data;
  } catch (error) {
    console.error("Error updating employee:", error.response?.data?.message || error.message);
    throw error;
  }
};

// Example: Delete an employee
export const deleteEmployee = async (id) => {
  try {
    const response = await api.delete(`/api/employees/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting employee:", error.response?.data?.message || error.message);
    throw error;
  }
};
