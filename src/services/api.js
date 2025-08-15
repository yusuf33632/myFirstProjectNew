// services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.108:5056/api/v1',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

export default api;
