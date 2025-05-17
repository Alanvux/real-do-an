// src/services/openaiService.ts
import { OpenAI } from 'openai';
import config from '../config';
import logger from '../utils/logger';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: config.openaiApiKey
});

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

interface ConceptsResponse {
  concepts: string[];
}

/**
 * Generate a chat completion using OpenAI API
 * @param query - User's question or prompt
 * @param context - Optional context from course materials
 * @returns Promise<string> - AI response
 */
export const generateChatResponse = async (query: string, context: string[] = []): Promise<string> => {
  try {
    // Prepare system message with instructions
    const systemMessage = {
      role: 'system' as const,
      content: `You are an educational assistant for an e-learning platform. 
      Your goal is to help students understand course materials and answer their questions accurately and clearly.
      Keep responses concise but informative. If you don't know the answer, admit it rather than making something up.
      ${context.length > 0 ? 'Use the following course material context to inform your answers when relevant:' : ''}
      ${context.join('\n\n')}`
    };

    // Prepare user message
    const userMessage = {
      role: 'user' as const,
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
    const err = error as Error;
    logger.error('OpenAI API error:', err.message);
    throw new Error(`Failed to generate AI response: ${err.message}`);
  }
};

/**
 * Extract key concepts from lecture content
 * @param content - Lecture content
 * @returns Promise<string[]> - Array of key concepts
 */
export const extractKeyConcepts = async (content: string): Promise<string[]> => {
  try {
    const response = await openai.chat.completions.create({
      model: config.openaiModel,
      messages: [
        {
          role: 'system' as const,
          content: 'Extract the 5-7 most important concepts or terms from the following educational content. Return them as a JSON array of strings.'
        },
        {
          role: 'user' as const,
          content
        }
      ],
      max_tokens: 512,
      temperature: 0.3,
      response_format: { type: 'json_object' }
    });

    const result = JSON.parse(response.choices[0].message.content) as ConceptsResponse;
    return result.concepts || [];
  } catch (error) {
    const err = error as Error;
    logger.error('OpenAI concept extraction error:', err.message);
    return [];
  }
};

/**
 * Generate quiz questions based on lecture content
 * @param content - Lecture content
 * @param numQuestions - Number of questions to generate (default: 5)
 * @returns Promise<QuizQuestion[]> - Array of quiz questions
 */
export const generateQuizQuestions = async (content: string, numQuestions: number = 5): Promise<QuizQuestion[]> => {
  try {
    const response = await openai.chat.completions.create({
      model: config.openaiModel,
      messages: [
        {
          role: 'system' as const,
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
          role: 'user' as const,
          content
        }
      ],
      max_tokens: 1024,
      temperature: 0.7,
      response_format: { type: 'json_object' }
    });

    const result = JSON.parse(response.choices[0].message.content) as { questions: QuizQuestion[] };
    return result.questions || [];
  } catch (error) {
    const err = error as Error;
    logger.error('OpenAI quiz generation error:', err.message);
    return [];
  }
};

/**
 * Generate feedback for a student's assignment submission
 * @param assignmentDescription - Assignment description
 * @param submission - Student's submission
 * @returns Promise<string> - Generated feedback
 */
export const generateAssignmentFeedback = async (assignmentDescription: string, submission: string): Promise<string> => {
  try {
    const response = await openai.chat.completions.create({
      model: config.openaiModel,
      messages: [
        {
          role: 'system' as const,
          content: `You are an educational assistant helping teachers provide feedback on student assignments.
          You will be given an assignment description and a student's submission.
          Provide constructive, helpful feedback that identifies strengths and areas for improvement.
          Be specific, supportive, and offer actionable suggestions for improvement.`
        },
        {
          role: 'user' as const,
          content: `Assignment: ${assignmentDescription}\n\nStudent Submission: ${submission}`
        }
      ],
      max_tokens: 1024,
      temperature: 0.7
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    const err = error as Error;
    logger.error('OpenAI feedback generation error:', err.message);
    throw new Error(`Failed to generate feedback: ${err.message}`);
  }
};

export default {
  generateChatResponse,
  extractKeyConcepts,
  generateQuizQuestions,
  generateAssignmentFeedback
};