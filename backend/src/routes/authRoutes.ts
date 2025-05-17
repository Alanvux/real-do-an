// src/routes/authRoutes.ts
import express from 'express';
import { body } from 'express-validator';
import authController from '../controllers/authController';
import { protect } from '../middleware/authMiddleware';
import validateRequest from '../middleware/validateRequest';

const router = express.Router();

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
router.post(
  '/register',
  [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('role')
      .optional()
      .isIn(['student', 'teacher', 'admin'])
      .withMessage('Role must be student, teacher, or admin'),
    validateRequest
  ],
  authController.register
);

/**
 * @route POST /api/auth/login
 * @desc Login user
 * @access Public
 */
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').notEmpty().withMessage('Password is required'),
    validateRequest
  ],
  authController.login
);

/**
 * @route POST /api/auth/refresh-token
 * @desc Refresh access token
 * @access Public
 */
router.post(
  '/refresh-token',
  [
    body('refreshToken').notEmpty().withMessage('Refresh token is required'),
    validateRequest
  ],
  authController.refreshToken
);

/**
 * @route POST /api/auth/logout
 * @desc Logout user
 * @access Private
 */
router.post('/logout', protect, authController.logout);

/**
 * @route GET /api/auth/me
 * @desc Get current user
 * @access Private
 */
router.get('/me', protect, authController.getMe);

/**
 * @route PATCH /api/auth/change-password
 * @desc Change password
 * @access Private
 */
router.patch(
  '/change-password',
  protect,
  [
    body('currentPassword').notEmpty().withMessage('Current password is required'),
    body('newPassword')
      .isLength({ min: 6 })
      .withMessage('New password must be at least 6 characters long'),
    validateRequest
  ],
  authController.changePassword
);

export default router;