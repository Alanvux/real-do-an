// src/middleware/validateRequest.ts
import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

/**
 * Middleware to validate request using express-validator
 * Checks if there are validation errors and returns them
 */
const validateRequest = (req: Request, res: Response, next: NextFunction): void | Response => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      message: 'Validation error',
      errors: errors.array().map(err => ({
        field: err.path,
        message: err.msg
      }))
    });
  }
  next();
};

export default validateRequest;