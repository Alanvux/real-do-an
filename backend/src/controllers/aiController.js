// src/controllers/aiController.js
const db = require('../db');
const { generateChatResponse, extractKeyConcepts, generateQuizQuestions, generateAssignmentFeedback } = require('../services/openaiService');
const AppError = require('../utils/appError');
const logger = require('../utils/logger');

/**
 * AI chat interaction
 * @route POST /api/ai/chat
 */
const chatWithAI = async (req, res, next) => {
  try {
    const { query, courseId } = req.body;
    const userId = req.user.id;

    if (!query) {
      return next(new AppError('Query is required', 400));
    }

    // Get relevant course materials for context if courseId is provided
    let context = [];
    if (courseId) {
      // Check if user is enrolled in the course
      const enrollmentResult = await db.query(
        'SELECT * FROM enrollments WHERE user_id = $1 AND course_id = $2',
        [userId, courseId]
      );

      if (enrollmentResult.rows.length === 0) {
        return next(new AppError('You are not enrolled in this course', 403));
      }

      // Get lecture content from the course
      const lectureResult = await db.query(
        `SELECT title, description, content_type, content_url 
         FROM lectures 
         WHERE course_id = $1 AND is_published = true
         ORDER BY order_index`,
        [courseId]
      );

      // Add relevant lecture content to context
      context = lectureResult.rows.map(lecture => 
        `Lecture: ${lecture.title}\nDescription: ${lecture.description}`
      );
    }

    // Generate response from OpenAI
    const aiResponse = await generateChatResponse(query, context);

    // Store the chat interaction in database
    await db.query(
      'INSERT INTO ai_chat_history (user_id, query, response) VALUES ($1, $2, $3)',
      [userId, query, aiResponse]
    );

    res.status(200).json({
      status: 'success',
      data: {
        response: aiResponse
      }
    });
  } catch (error) {
    logger.error('AI chat error:', error);
    next(new AppError('Failed to process AI chat request', 500));
  }
};

/**
 * Generate quiz questions for a lecture
 * @route POST /api/ai/generate-quiz
 */
const generateQuiz = async (req, res, next) => {
  try {
    const { lectureId, numQuestions = 5 } = req.body;
    const userId = req.user.id;

    // Only teachers and admins can generate quizzes
    if (req.user.role !== 'teacher' && req.user.role !== 'admin') {
      return next(new AppError('You do not have permission to generate quizzes', 403));
    }

    // Get lecture content
    const lectureResult = await db.query(
      'SELECT l.*, c.teacher_id FROM lectures l JOIN courses c ON l.course_id = c.id WHERE l.id = $1',
      [lectureId]
    );

    if (lectureResult.rows.length === 0) {
      return next(new AppError('Lecture not found', 404));
    }

    const lecture = lectureResult.rows[0];

    // Check if user is the teacher of the course or an admin
    if (req.user.role === 'teacher' && lecture.teacher_id !== userId) {
      return next(new AppError('You do not have permission to generate quizzes for this course', 403));
    }

    // Use lecture title and description for context
    const content = `Lecture Title: ${lecture.title}\nDescription: ${lecture.description}`;

    // Generate quiz questions
    const questions = await generateQuizQuestions(content, numQuestions);

    res.status(200).json({
      status: 'success',
      data: {
        questions
      }
    });
  } catch (error) {
    logger.error('Generate quiz error:', error);
    next(new AppError('Failed to generate quiz questions', 500));
  }
};

/**
 * Extract key concepts from a lecture
 * @route POST /api/ai/extract-concepts
 */
const extractConcepts = async (req, res, next) => {
  try {
    const { lectureId } = req.body;
    const userId = req.user.id;

    // Get lecture content
    const lectureResult = await db.query(
      'SELECT l.*, c.teacher_id FROM lectures l JOIN courses c ON l.course_id = c.id WHERE l.id = $1',
      [lectureId]
    );

    if (lectureResult.rows.length === 0) {
      return next(new AppError('Lecture not found', 404));
    }

    const lecture = lectureResult.rows[0];

    // Check if user is enrolled in the course, is the teacher, or an admin
    if (req.user.role === 'student') {
      const enrollmentResult = await db.query(
        'SELECT * FROM enrollments WHERE user_id = $1 AND course_id = $2',
        [userId, lecture.course_id]
      );

      if (enrollmentResult.rows.length === 0) {
        return next(new AppError('You are not enrolled in this course', 403));
      }
    } else if (req.user.role === 'teacher' && lecture.teacher_id !== userId) {
      return next(new AppError('You do not have permission to access this lecture', 403));
    }

    // Use lecture title and description for extraction
    const content = `Lecture Title: ${lecture.title}\nDescription: ${lecture.description}`;

    // Extract key concepts
    const concepts = await extractKeyConcepts(content);

    res.status(200).json({
      status: 'success',
      data: {
        concepts
      }
    });
  } catch (error) {
    logger.error('Extract concepts error:', error);
    next(new AppError('Failed to extract key concepts', 500));
  }
};

/**
 * Generate feedback for assignment submission
 * @route POST /api/ai/generate-feedback
 */
const generateFeedback = async (req, res, next) => {
  try {
    const { submissionId } = req.body;
    const userId = req.user.id;

    // Only teachers and admins can generate feedback
    if (req.user.role !== 'teacher' && req.user.role !== 'admin') {
      return next(new AppError('You do not have permission to generate feedback', 403));
    }

    // Get submission details
    const submissionResult = await db.query(
      `SELECT s.*, a.title as assignment_title, a.description as assignment_description, 
       a.course_id, c.teacher_id 
       FROM assignment_submissions s
       JOIN assignments a ON s.assignment_id = a.id
       JOIN courses c ON a.course_id = c.id
       WHERE s.id = $1`,
      [submissionId]
    );

    if (submissionResult.rows.length === 0) {
      return next(new AppError('Submission not found', 404));
    }

    const submission = submissionResult.rows[0];

    // Check if user is the teacher of the course or an admin
    if (req.user.role === 'teacher' && submission.teacher_id !== userId) {
      return next(new AppError('You do not have permission to generate feedback for this submission', 403));
    }

    // Generate feedback
    const feedback = await generateAssignmentFeedback(
      submission.assignment_description,
      submission.submission_text || 'No text submission available.'
    );

    res.status(200).json({
      status: 'success',
      data: {
        feedback
      }
    });
  } catch (error) {
    logger.error('Generate feedback error:', error);
    next(new AppError('Failed to generate feedback', 500));
  }
};

/**
 * Get chat history for a user
 * @route GET /api/ai/chat-history
 */
const getChatHistory = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { limit = 20, offset = 0 } = req.query;

    // Get chat history
    const result = await db.query(
      'SELECT * FROM ai_chat_history WHERE user_id = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3',
      [userId, limit, offset]
    );

    res.status(200).json({
      status: 'success',
      results: result.rows.length,
      data: {
        chatHistory: result.rows
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  chatWithAI,
  generateQuiz,
  extractConcepts,
  generateFeedback,
  getChatHistory
};