// src/controllers/authController.ts
import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import db from '../db';
import config from '../config';
import AppError from '../utils/appError';
import redisService from '../services/redisService';
import { UserRole } from '../types';

interface RegisterRequest extends Request {
  body: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role?: UserRole;
  };
}

interface LoginRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

interface RefreshTokenRequest extends Request {
  body: {
    refreshToken: string;
  };
}

interface ChangePasswordRequest extends Request {
  body: {
    currentPassword: string;
    newPassword: string;
  };
}

/**
 * Generate JWT token
 * @param id - User ID
 * @param role - User role
 */
const generateToken = (id: string, role: UserRole): string => {
  return jwt.sign({ id, role }, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn,
  });
};

/**
 * Generate refresh token
 * @param id - User ID
 */
const generateRefreshToken = (id: string): string => {
  return jwt.sign({ id }, config.jwtSecret, {
    expiresIn: config.jwtRefreshExpiresIn,
  });
};

/**
 * Register a new user
 * @route POST /api/auth/register
 */
export const register = async (req: RegisterRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password, firstName, lastName, role = 'student' } = req.body;

    // Check if user already exists
    const existingUser = await db.query('SELECT * FROM users WHERE email = $1', [email]);

    if (existingUser.rows.length > 0) {
      return next(new AppError('User with this email already exists', 400));
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const userId = uuidv4();
    const result = await db.query(
      'INSERT INTO users (id, email, password, role, first_name, last_name) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, email, role, first_name, last_name',
      [userId, email, hashedPassword, role, firstName, lastName]
    );

    const user = result.rows[0];

    // Generate tokens
    const token = generateToken(user.id, user.role);
    const refreshToken = generateRefreshToken(user.id);

    // Send response
    res.status(201).json({
      status: 'success',
      data: {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
          role: user.role,
        },
        token,
        refreshToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Login user
 * @route POST /api/auth/login
 */
export const login = async (req: LoginRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Find user
    const result = await db.query(
      'SELECT id, email, password, role, first_name, last_name FROM users WHERE email = $1',
      [email]
    );

    const user = result.rows[0];

    // Check if user exists and password is correct
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return next(new AppError('Invalid email or password', 401));
    }

    // Generate tokens
    const token = generateToken(user.id, user.role);
    const refreshToken = generateRefreshToken(user.id);

    // Send response
    res.status(200).json({
      status: 'success',
      data: {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
          role: user.role,
        },
        token,
        refreshToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Refresh access token
 * @route POST /api/auth/refresh-token
 */
export const refreshToken = async (req: RefreshTokenRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { refreshToken } = req.body;

    // Verify refresh token
    const decoded: any = jwt.verify(refreshToken, config.jwtSecret);

    // Check if token is blacklisted
    const isBlacklisted = await redisService.getBlacklistedToken(refreshToken);
    if (isBlacklisted) {
      return next(new AppError('Invalid refresh token', 401));
    }

    // Check if user exists
    const result = await db.query(
      'SELECT id, role FROM users WHERE id = $1',
      [decoded.id]
    );

    if (result.rows.length === 0) {
      return next(new AppError('User not found', 404));
    }

    const user = result.rows[0];

    // Generate new access token
    const token = generateToken(user.id, user.role);

    // Send response
    res.status(200).json({
      status: 'success',
      data: {
        token,
      },
    });
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return next(new AppError('Invalid refresh token', 401));
    }
    next(error);
  }
};

/**
 * Logout user
 * @route POST /api/auth/logout
 */
export const logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Get token
    let token: string | undefined;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(new AppError('No token provided', 401));
    }

    // Get decoded token to determine expiry
    const decoded: any = jwt.verify(token, config.jwtSecret);
    const expiresIn = decoded.exp - Math.floor(Date.now() / 1000);

    // Blacklist token
    await redisService.blacklistToken(token, expiresIn > 0 ? expiresIn : 3600);

    res.status(200).json({
      status: 'success',
      message: 'Logged out successfully',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get current user
 * @route GET /api/auth/me
 */
export const getMe = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return next(new AppError('User not found', 404));
    }

    // Get user data
    const result = await db.query(
      'SELECT id, email, role, first_name, last_name, profile_picture, bio FROM users WHERE id = $1',
      [userId]
    );

    if (result.rows.length === 0) {
      return next(new AppError('User not found', 404));
    }

    const user = result.rows[0];

    // Send response
    res.status(200).json({
      status: 'success',
      data: {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
          role: user.role,
          profilePicture: user.profile_picture,
          bio: user.bio,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Change password
 * @route PATCH /api/auth/change-password
 */
export const changePassword = async (req: ChangePasswordRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return next(new AppError('User not found', 404));
    }

    // Get current user with password
    const result = await db.query(
      'SELECT password FROM users WHERE id = $1',
      [userId]
    );

    if (result.rows.length === 0) {
      return next(new AppError('User not found', 404));
    }

    const user = result.rows[0];

    // Check if current password is correct
    if (!(await bcrypt.compare(currentPassword, user.password))) {
      return next(new AppError('Current password is incorrect', 401));
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password
    await db.query(
      'UPDATE users SET password = $1, updated_at = NOW() WHERE id = $2',
      [hashedPassword, userId]
    );

    // Send response
    res.status(200).json({
      status: 'success',
      message: 'Password updated successfully',
    });
  } catch (error) {
    next(error);
  }
};

export default {
  register,
  login,
  refreshToken,
  logout,
  getMe,
  changePassword
};