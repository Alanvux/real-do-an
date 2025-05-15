// src/middleware/validateRequest.js
const { validationResult } = require('express-validator');

/**
 * Middleware to validate request using express-validator
 * Checks if there are validation errors and returns them
 */
const validateRequest = (req, res, next) => {
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

module.exports = validateRequest;