// src/services/openaiService.js
const { OpenAI } = require('openai');
const config = require('../config');
const logger = require('../utils/logger');

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: config.openaiApiKey
});

/**
 * Generate a chat completion using OpenAI API
 * @param {string} query - User's question or prompt
 * @param {Array} context - Optional context from course materials
 * @returns {Promise<string>} - AI response
 */
const generateChatResponse = async (query, context = []) => {
  try {
    // Prepare system message with instructions
    const systemMessage = {
      role: 'system',
      content: `You are an educational assistant for an e-learning platform. 
      Your goal is to help students understand course materials and answer their questions accurately and clearly.
      Keep responses concise but informative. If you don't know the answer, admit it rather than making something up.
      ${context.length > 0 ? 'Use the following course material context to inform your answers when relevant:' : ''}
      ${context.join('\n\n')}`
    };

    // Prepare user message
    const userMessage = {
      role: 'user',
      content: query
    };

    // Make API call to OpenAI
    const response = await openai.chat.completions.create({
      model: config.openaiModel,
      messages: [systemMessage, userMessage],
      max_tokens: 1024,
      temperature: 0.7
    });

    // Return the generated response
    return response.choices[0].message.content.trim();
  } catch (error) {
    logger.error('OpenAI API error:', error);
    throw new Error(`Failed to generate AI response: ${error.message}`);
  }
};

/**
 * Extract key concepts from lecture content
 * @param {string} content - Lecture content
 * @returns {Promise<Array>} - Array of key concepts
 */
const extractKeyConcepts = async (content) => {
  try {
    const response = await openai.chat.completions.create({
      model: config.openaiModel,
      messages: [
        {
          role: 'system',
          content: 'Extract the 5-7 most important concepts or terms from the following educational content. Return them as a JSON array of strings.'
        },
        {
          role: 'user',
          content
        }
      ],
      max_tokens: 512,
      temperature: 0.3,
      response_format: { type: 'json_object' }
    });

    const result = JSON.parse(response.choices[0].message.content);
    return result.concepts || [];
  } catch (error) {
    logger.error('OpenAI concept extraction error:', error);
    return [];
  }
};

/**
 * Generate quiz questions based on lecture content
 * @param {string} content - Lecture content
 * @param {number} numQuestions - Number of questions to generate (default: 5)
 * @returns {Promise<Array>} - Array of quiz questions
 */
const generateQuizQuestions = async (content, numQuestions = 5) => {
  try {
    const response = await openai.chat.completions.create({
      model: config.openaiModel,
      messages: [
        {
          role: 'system',
          content: `Generate ${numQuestions} multiple-choice quiz questions based on the following educational content. 
          Each question should have 4 options with only one correct answer.
          Return the result as a JSON array where each item has the format:
          {
            "question": "Question text",
            "options": ["Option A", "Option B", "Option C", "Option D"],
            "correctAnswerIndex": 0, // Index of the correct answer (0-3)
            "explanation": "Explanation of why this answer is correct"
          }`
        },
        {
          role: 'user',
          content
        }
      ],
      max_tokens: 1024,
      temperature: 0.7,
      response_format: { type: 'json_object' }
    });

    const result = JSON.parse(response.choices[0].message.content);
    return result.questions || [];
  } catch (error) {
    logger.error('OpenAI quiz generation error:', error);
    return [];
  }
};

/**
 * Generate feedback for a student's assignment submission
 * @param {string} assignmentDescription - Assignment description
 * @param {string} submission - Student's submission
 * @returns {Promise<string>} - Generated feedback
 */
const generateAssignmentFeedback = async (assignmentDescription, submission) => {
  try {
    const response = await openai.chat.completions.create({
      model: config.openaiModel,
      messages: [
        {
          role: 'system',
          content: `You are an educational assistant helping teachers provide feedback on student assignments.
          You will be given an assignment description and a student's submission.
          Provide constructive, helpful feedback that identifies strengths and areas for improvement.
          Be specific, supportive, and offer actionable suggestions for improvement.`
        },
        {
          role: 'user',
          content: `Assignment: ${assignmentDescription}\n\nStudent Submission: ${submission}`
        }
      ],
      max_tokens: 1024,
      temperature: 0.7
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    logger.error('OpenAI feedback generation error:', error);
    throw new Error(`Failed to generate feedback: ${error.message}`);
  }
};

module.exports = {
  generateChatResponse,
  extractKeyConcepts,
  generateQuizQuestions,
  generateAssignmentFeedback
};