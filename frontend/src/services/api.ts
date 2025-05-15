// src/services/api.ts
import axios from 'axios';
import { store } from '@/redux/store';
import { refreshToken, logout } from '@/redux/slices/authSlice';

// Create Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercept requests to add auth token
api.interceptors.request.use(
  (config) => {
    const state = store.getState();
    if (state.auth.token) {
      config.headers.Authorization = `Bearer ${state.auth.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercept responses to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If the error is unauthorized and not from a retry attempt
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Try to refresh the token
        const state = store.getState();
        if (state.auth.refreshToken) {
          // Dispatch token refresh
          const result = await store.dispatch(refreshToken());
          
          // If token refresh was successful
          if (refreshToken.fulfilled.match(result)) {
            // Update the header with the new token
            originalRequest.headers.Authorization = `Bearer ${result.payload.token}`;
            // Retry the original request
            return api(originalRequest);
          }
        }
        
        // If refresh token is missing or refresh failed, log out
        await store.dispatch(logout());
        return Promise.reject(error);
      } catch (refreshError) {
        // If token refresh failed, log out
        await store.dispatch(logout());
        return Promise.reject(refreshError);
      }
    }
    
    // For other errors, just pass them through
    return Promise.reject(error);
  }
);

export default api;