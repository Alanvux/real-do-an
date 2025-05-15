// src/services/authService.ts
import api from './api';

/**
 * Service for authentication-related API calls
 */
const authService = {
  /**
   * Login user
   * @param email - User email
   * @param password - User password
   * @returns User data with tokens
   */
  async login(email: string, password: string) {
    const response = await api.post('/auth/login', { email, password });
    return response.data.data;
  },

  /**
   * Register new user
   * @param email - User email
   * @param password - User password
   * @param firstName - User first name
   * @param lastName - User last name
   * @param role - User role (default: 'student')
   * @returns User data with tokens
   */
  async register(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    role: string = 'student'
  ) {
    const response = await api.post('/auth/register', {
      email,
      password,
      firstName,
      lastName,
      role,
    });
    return response.data.data;
  },

  /**
   * Logout user
   */
  async logout() {
    await api.post('/auth/logout');
  },

  /**
   * Refresh access token
   * @param refreshToken - Refresh token
   * @returns New access token
   */
  async refreshToken(refreshToken: string) {
    const response = await api.post('/auth/refresh-token', { refreshToken });
    return response.data.data;
  },

  /**
   * Get current user profile
   * @returns User profile data
   */
  async getCurrentUser() {
    const response = await api.get('/auth/me');
    return response.data.data.user;
  },

  /**
   * Change user password
   * @param currentPassword - Current password
   * @param newPassword - New password
   * @returns Success message
   */
  async changePassword(currentPassword: string, newPassword: string) {
    const response = await api.patch('/auth/change-password', {
      currentPassword,
      newPassword,
    });
    return response.data;
  },
};

export default authService;