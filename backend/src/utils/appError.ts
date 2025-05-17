// src/utils/appError.ts
/**
 * Custom error class for API errors
 * Extends the built-in Error class
 */
class AppError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;

  /**
   * Create a new AppError
   * @param message - Error message
   * @param statusCode - HTTP status code
   */
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true; // Indicates it's an operational error, not a programming error

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;