// src/middleware/errorMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

/**
 * Custom error with status code
 */
interface CustomError extends Error {
  status?: number;
  statusCode?: number;
  stack?: string;
}

/**
 * Handle 404 errors for routes that don't exist
 */
export const notFound = (req: Request, res: Response, next: NextFunction): void => {
  const error: CustomError = new Error(`Not Found - ${req.originalUrl}`);
  error.status = 404;
  next(error);
};

/**
 * Central error handling middleware
 */
export const errorHandler = (
  err: CustomError, 
  req: Request, 
  res: Response, 
  next: NextFunction
): void => {
  // Log errors with stack trace in development
  if (process.env.NODE_ENV === 'development') {
    logger.error(err.stack);
  } else {
    logger.error(`${err.name}: ${err.message}`);
  }

  // Set status code
  const statusCode = err.status || err.statusCode || 500;

  // Format error response
  const errorResponse: {
    status: string;
    message: string;
    stack?: string;
  } = {
    status: 'error',
    message: err.message || 'Internal Server Error',
  };

  // Add error details in development mode
  if (process.env.NODE_ENV === 'development') {
    errorResponse.stack = err.stack;
  }

  // Send error response
  res.status(statusCode).json(errorResponse);
};