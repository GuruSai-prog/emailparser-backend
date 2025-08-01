// Environment configuration
const config = {
  // API Base URL - change this for different environments
  API_BASE_URL: process.env.REACT_APP_API_BASE_URL || 'http://emailparser-env.eba-3evbrxvz.us-east-1.elasticbeanstalk.com',
  
  // Timeout settings
  API_TIMEOUT: 10000,
  
  // Feature flags
  ENABLE_LOGGING: process.env.NODE_ENV === 'development',
};

export default config; 