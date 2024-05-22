// src/config.js

// Define your API base URL here
const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5080';

// Export it for use in other files
export default {
  backendUrl,
};
