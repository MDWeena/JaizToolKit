import { useAuthStore } from '@/store/auth.store';
import axios from 'axios';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) throw new Error('API Base URL not configured');

export const ApiService = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

ApiService.interceptors.request.use(
  (config) => {
    const user = useAuthStore.getState().user;
    if (user?.accessToken) {
      config.headers.Authorization = `Bearer ${user.accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

ApiService.interceptors.response.use(
  (response) => response,
  (error) => {
    // Extract a consistent message shape
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      error?.message ||
      'Something went wrong. Please try again.';

    const normalizedError = {
      message,
      status: error?.response?.status ?? 500,
      data: error?.response?.data,
    };

    return Promise.reject(normalizedError);
  }
);