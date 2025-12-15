import axios from 'axios';

const API_URL =
  import.meta.env.VITE_BACKEND_URL ||
  'https://alexandre-dumas-api.lesmysteresdelegypteantique.fr';

console.log('🔗 API URL:', API_URL);

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
