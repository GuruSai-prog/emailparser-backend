// Frontend Configuration for Email Receipt Processor
// Use this configuration in your frontend application

const API_CONFIG = {
  // Deployed Backend URL
  BASE_URL: 'https://emailparser-backend-f7li.onrender.com',
  
  // API Endpoints
  ENDPOINTS: {
    LEDGER: '/api/ledger',
    EMAIL: '/api/email',
    RECONCILIATION: '/api/reconciliation'
  },
  
  // Full API URLs
  LEDGER_URL: 'https://emailparser-backend-f7li.onrender.com/api/ledger',
  EMAIL_URL: 'https://emailparser-backend-f7li.onrender.com/api/email',
  RECONCILIATION_URL: 'https://emailparser-backend-f7li.onrender.com/api/reconciliation'
};

// Example usage in React/Vue/Angular
export default API_CONFIG;

// Example fetch function
export const fetchLedger = async () => {
  try {
    const response = await fetch(API_CONFIG.LEDGER_URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching ledger:', error);
    throw error;
  }
};

// Example axios configuration
export const axiosConfig = {
  baseURL: API_CONFIG.BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
}; 