// src/middleware/errorMiddleware.js
const logger = require('../utils/logger');

/**
 * Handle 404 errors for routes that don't exist
 */
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.status = 404;
  next(error);
};

/**
 * Central error handling middleware
 */
const errorHandler = (err, req, res, next) => {
  // Log errors with stack trace in development
  if (process.env.NODE_ENV === 'development') {
    logger.error(err.stack);
  } else {
    logger.error(`${err.name}: ${err.message}`);
  }

  // Set status code
  const statusCode = err.status || err.statusCode || 500;

  // Format error response
  const errorResponse = {
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

module.exports = {
  notFound,
  errorHandler
};