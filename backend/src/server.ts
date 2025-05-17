// src/server.ts
import app from './app';
import config from './config';
import logger from './utils/logger';

// Start the server
const server = app.listen(config.port, () => {
  logger.info(`Server running on port ${config.port}`);
  logger.info(`Environment: ${config.environment}`);
});

// Handle unhandled rejections
process.on('unhandledRejection', (err: Error) => {
  logger.error('UNHANDLED REJECTION! Shutting down...');
  logger.error(err.name, err.message);
  
  // Close server & exit process
  server.close(() => {
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err: Error) => {
  logger.error('UNCAUGHT EXCEPTION! Shutting down...');
  logger.error(err.name, err.message);
  
  // Exit process
  process.exit(1);
});