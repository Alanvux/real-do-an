// src/services/aiChatService.ts
import api from './api';

/**
 * Service for AI chat-related API calls
 */
const aiChatService = {
  /**
   * Send a message to the AI chat assistant
   * @param query - User's question or message
   * @param courseId - Optional course ID for context
   * @returns AI response
   */
  async sendMessage(query: string, courseId?: string) {
    const body: { query: string; courseId?: string } = { query };
    
    if (courseId) {
      body.courseId = courseId;
    }
    
    const response = await api.post('/ai/chat', body);
    return response.data.data;
  },

  /**
   * Get chat history for the current user
   * @param limit - Number of chat messages to retrieve
   * @param offset - Offset for pagination
   * @returns Chat history
   */
  async getChatHistory(limit: number = 20, offset: number = 0) {
    const response = await api.get('/ai/chat-history', {
      params: { limit, offset }
    });
    return response.data.data;
  },

  /**
   * Generate quiz questions for a lecture
   * @param lectureId - Lecture ID
   * @param numQuestions - Number of questions to generate (default: 5)
   * @returns Generated quiz questions
   */
  async generateQuiz(lectureId: string, numQuestions: number = 5) {
    const response = await api.post('/ai/generate-quiz', {
      lectureId,
      numQuestions
    });
    return response.data.data;
  },

  /**
   * Extract key concepts from a lecture
   * @param lectureId - Lecture ID
   * @returns Extracted key concepts
   */
  async extractConcepts(lectureId: string) {
    const response = await api.post('/ai/extract-concepts', {
      lectureId
    });
    return response.data.data;
  },

  /**
   * Generate feedback for an assignment submission
   * @param submissionId - Submission ID
   * @returns Generated feedback
   */
  async generateFeedback(submissionId: string) {
    const response = await api.post('/ai/generate-feedback', {
      submissionId
    });
    return response.data.data;
  }
};

export default aiChatService;