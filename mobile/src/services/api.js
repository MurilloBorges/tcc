import axios from 'axios';
import { getToken } from './authentication';

const api = axios.create({
  baseURL: 'http://192.168.1.189:3333',
});

api.interceptors.request.use(
  async (config) => {
    const token = await getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
