// src/app.ts
import express, { Request, Response, Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { errorHandler, notFound } from './middleware/errorMiddleware';
import config from './config';

// Import routes
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import courseRoutes from './routes/courseRoutes';
import lectureRoutes from './routes/lectureRoutes';
import enrollmentRoutes from './routes/enrollmentRoutes';
import assignmentRoutes from './routes/assignmentRoutes';
import messageRoutes from './routes/messageRoutes';
import aiRoutes from './routes/aiRoutes';
import categoryRoutes from './routes/categoryRoutes';

// Initialize Express app
const app: Application = express();

// Global middleware
app.use(helmet()); // Set security HTTP headers
app.use(morgan(config.environment === 'development' ? 'dev' : 'combined')); // HTTP request logger
app.use(express.json({ limit: '10mb' })); // Parse JSON request body
app.use(express.urlencoded({ extended: true, limit: '10mb' })); // Parse URL-encoded request body
app.use(cors({ origin: config.corsOrigin, credentials: true })); // Enable CORS

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/lectures', lectureRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/categories', categoryRoutes);

// Simple health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'API is running',
    timestamp: new Date(),
    environment: config.environment
  });
});

// API documentation
app.get('/api', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to E-Learning API',
    documentation: '/api/docs',
    version: '1.0.0'
  });
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

export default app;