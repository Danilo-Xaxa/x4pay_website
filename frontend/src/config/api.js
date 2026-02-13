/**
 * API Configuration
 * Centralized API endpoint configuration
 */

export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

export const API_ENDPOINTS = {
  contact: `${API_BASE_URL}/contact`,
};

const apiConfig = {
  BASE_URL: API_BASE_URL,
  ENDPOINTS: API_ENDPOINTS,
};

export default apiConfig;
