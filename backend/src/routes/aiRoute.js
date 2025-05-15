// src/routes/aiRoutes.js
const express = require('express');
const { body, query } = require('express-validator');
const aiController = require('../controllers/aiController');
const { protect, restrictTo } = require('../middleware/authMiddleware');
const validateRequest = require('../middleware/validateRequest');

const router = express.Router();

// All AI routes require authentication
router.use(protect);

/**
 * @route POST /api/ai/chat
 * @desc Chat with AI assistant
 * @access Private
 */
router.post(
  '/chat',
  [
    body('query').notEmpty().withMessage('Query is required'),
    body('courseId').optional().isUUID().withMessage('Invalid course ID format'),
    validateRequest
  ],
  aiController.chatWithAI
);

/**
 * @route POST /api/ai/generate-quiz
 * @desc Generate quiz questions for a lecture
 * @access Private (Teacher, Admin)
 */
router.post(
  '/generate-quiz',
  restrictTo('teacher', 'admin'),
  [
    body('lectureId').isUUID().withMessage('Invalid lecture ID format'),
    body('numQuestions').optional().isInt({ min: 1, max: 20 }).withMessage('Number of questions must be between 1 and 20'),
    validateRequest
  ],
  aiController.generateQuiz
);

/**
 * @route POST /api/ai/extract-concepts
 * @desc Extract key concepts from a lecture
 * @access Private
 */
router.post(
  '/extract-concepts',
  [
    body('lectureId').isUUID().withMessage('Invalid lecture ID format'),
    validateRequest
  ],
  aiController.extractConcepts
);

/**
 * @route POST /api/ai/generate-feedback
 * @desc Generate feedback for assignment submission
 * @access Private (Teacher, Admin)
 */
router.post(
  '/generate-feedback',
  restrictTo('teacher', 'admin'),
  [
    body('submissionId').isUUID().withMessage('Invalid submission ID format'),
    validateRequest
  ],
  aiController.generateFeedback
);

/**
 * @route GET /api/ai/chat-history
 * @desc Get chat history for a user
 * @access Private
 */
router.get(
  '/chat-history',
  [
    query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
    query('offset').optional().isInt({ min: 0 }).withMessage('Offset must be a non-negative integer'),
    validateRequest
  ],
  aiController.getChatHistory
);

module.exports = router;