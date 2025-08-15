import api from './api';

export const login = async (email, password) => {
  try {
    const response = await api.post('/Auth/login-sync', {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message);
    throw error;
  }
};
