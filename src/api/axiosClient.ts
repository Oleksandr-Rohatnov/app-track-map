import axios from 'axios';
import { getAuthKeyFromLocalStorage } from '../helpers/localStorage';

const axiosClient = axios.create({
  baseURL: 'https://cryptic-tor-24415-deb5a0b018ba.herokuapp.com/api',
  timeout: 10000
});

axiosClient.interceptors.request.use(
  (config) => {
    const authKey = getAuthKeyFromLocalStorage();
    if (authKey) {
      config.headers['Authorization'] = authKey;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default axiosClient;
