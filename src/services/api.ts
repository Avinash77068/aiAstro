import axios from 'axios';
import {startNetworkLogging} from 'react-native-network-logger';

startNetworkLogging();

const API_BASE_URL = 'https://astro-ai-backend-delta.vercel.app/api/';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

api.interceptors.request.use(
  async config => {
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  error => Promise.reject(error),
);

api.interceptors.response.use(
  response => {
    console.log('API Response:', response.status, response.config.url);
    return response;
  },
  error => {
    console.log('API Error:', error?.response?.status, error?.config?.url);
    return Promise.reject(error);
  },
);

export default api;
